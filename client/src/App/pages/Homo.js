import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Nav from './Nav.js';
import styles from './Homo.scss';
import { VictoryBar, VictoryChart, VictoryArea, VictoryAxis, VictoryTheme, VictoryStack, VictoryLegend, VictoryLabel, VictoryScatter } from 'victory';
import $ from "jquery";
import axios from 'axios';
import Modal from 'react-responsive-modal';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Page, Text, View, Document, PDFViewer, ReactPDF, PDFDownloadLink, StyleSheet, Font, Image } from '@react-pdf/renderer';

class Homo extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      inputValue: "",
      show: false,
      open: false,
      error: null,
      checkvalue: true,
      metrics: [],
      overallDegree : [],
      ginis: [],
    }
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  handleCheck() {
    this.setState({checkvalue: !this.state.checkvalue});
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
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
    let fetchAsync = async (filePath, partial) => {
      try {
        const data = await axios.get('/api/getHomo', {
            params: {
              filePath:filePath,
              partial: partial,
            }
        })

        if(data['data'][0].includes("error") === true) {
          this.setState({open: true});
          this.setState({error: data['data'][0]});
        }
        else{
          let id = 0;
          let res = data['data'][0];
          let resArray = res.split("\n")
          let renderArray = [];
          let giniArray = [];
          let overallDegree = [];
          let entropySave = [];
          let degreeArray = [];
          for(let i=0; i<resArray.length; i++) {
            if(i === 0) {
              id += 1;
              if(resArray[i] === "direct") {
                renderArray.push(["Format: Directed", id]);
              }
              else {
                renderArray.push(["Format: Undirected", id]);
              }
            }
            if(i === 1) {
              id += 1;
              renderArray.push(["Number of vertices: "+resArray[i], id]);
            }
            if(i === 2) {
              id += 1;
              renderArray.push(["Number of edges: "+resArray[i], id]);
            }
            if(i === 3) {
              id += 1;
              renderArray.push(["Reciprocity: "+resArray[i], id]);
            }
            if(i === 4) {
              let ginis = resArray[i].split(" ");
              giniArray.push({x:"Gini (overall)", y:ginis[0]});
              giniArray.push({x:"Gini (incoming)", y:ginis[1]});
              giniArray.push({x:"Gini (outcoming)", y:ginis[2]});
              console.log("gini", ginis);
              id += 1;
              renderArray.push(["Gini coefficient (overall): "+ginis[0], id]);
              id += 1;
              renderArray.push(["Gini coefficient (incoming): "+ginis[1], id]);
              id += 1;
              renderArray.push(["Gini coefficient (outcoming): "+ginis[2], id]);
            }
            if(partial === true) {
              entropySave.push("Relative edge distribution entropy (overall): N/A");
              entropySave.push("Relative edge distribution entropy (incoming): N/A");
              entropySave.push("Relative edge distribution entropy (outcoming): N/A");
              if(i === 5) {
                let degrees = resArray[i].split(" ");

                overallDegree.push({x : "Min", y : parseFloat(degrees[2]), symbol: "star", opacity: 0.9, fill: "black"});
                id += 1;
                renderArray.push(["Average Degree (overall): "+degrees[0], id]);
                overallDegree.push({x : "Avg", y : parseFloat(degrees[0]), symbol: "star", opacity: 0.9, fill: "black"});
                id += 1;
                renderArray.push(["Maximum Degree (overall): "+degrees[1], id]);
                overallDegree.push({x : "Max", y : parseFloat(degrees[1]), symbol: "star", opacity: 0.9, fill: "black"});
                id += 1;
                renderArray.push(["Minimum Degree (overall): "+degrees[2], id]);

                overallDegree.push({x : "Min", y : parseFloat(degrees[5]), symbol: "circle", opacity: 0.9, fill: "grey"});
                id += 1;
                renderArray.push(["Average Degree (incoming): "+degrees[3], id]);
                overallDegree.push({x : "Avg", y : parseFloat(degrees[3]), symbol: "circle", opacity: 0.9, fill: "grey"});
                id += 1;
                renderArray.push(["Maximum Degree (incoming): "+degrees[4], id]);
                overallDegree.push({x : "Max", y : parseFloat(degrees[4]), symbol: "circle", opacity: 0.9, fill: "grey"});
                id += 1;
                renderArray.push(["Minimum Degree (incoming): "+degrees[5], id]);

                overallDegree.push({x : "Min", y : parseFloat(degrees[8]), symbol: "diamond", opacity: 0.9, fill: "#525252"});
                id += 1;
                renderArray.push(["Average Degree (outcoming): "+degrees[6], id]);
                overallDegree.push({x : "Avg", y : parseFloat(degrees[6]), symbol: "diamond", opacity: 0.9, fill: "#525252"});
                id += 1;
                renderArray.push(["Maximum Degree (outcoming): "+degrees[7], id]);
                overallDegree.push({x : "Max", y : parseFloat(degrees[7]), symbol: "diamond", opacity: 0.9, fill: "#525252"});
                id += 1;
                renderArray.push(["Minimum Degree (outcoming): "+degrees[8], id]);

                degreeArray.push(["Average Degree (overall): "+degrees[0]]);
                degreeArray.push(["Maximum Degree (overall): "+degrees[1]]);
                degreeArray.push(["Minimum Degree (overall): "+degrees[2]]);
                degreeArray.push(["Average Degree (incoming): "+degrees[3]]);
                degreeArray.push(["Maximum Degree (incoming): "+degrees[4]]);
                degreeArray.push(["Minimum Degree (incoming): "+degrees[5]]);
                degreeArray.push(["Average Degree (outcoming): "+degrees[6]]);
                degreeArray.push(["Maximum Degree (outcoming): "+degrees[7]]);
                degreeArray.push(["Minimum Degree (outcoming): "+degrees[8]]);
              }
            }
            else {
              if(i === 5) {
                let entropies = resArray[i].split(" ");
                entropySave.push("Relative edge distribution entropy (overall): "+entropies[0]);
                entropySave.push("Relative edge distribution entropy (incoming): "+entropies[1]);
                entropySave.push("Relative edge distribution entropy (outcoming): "+entropies[2]);
                id += 1;
                renderArray.push(["Relative edge distribution entropy (overall): "+entropies[0], id]);
                id += 1;
                renderArray.push(["Relative edge distribution entropy (incoming): "+entropies[1], id]);
                id += 1;
                renderArray.push(["Relative edge distribution entropy (outcoming): "+entropies[2], id]);
              }
              if(i === 6) {
                let degrees = resArray[i].split(" ");

                overallDegree.push({x : "Min", y : parseFloat(degrees[2]), symbol: "star", opacity: 0.9, fill: "black"});
                overallDegree.push({x : "Avg", y : parseFloat(degrees[0]), symbol: "star", opacity: 0.9, fill: "black"});
                overallDegree.push({x : "Max", y : parseFloat(degrees[1]), symbol: "star", opacity: 0.9, fill: "black"});
                overallDegree.push({x : "Min", y : parseFloat(degrees[5]), symbol: "circle", opacity: 0.9, fill: "grey"});
                overallDegree.push({x : "Avg", y : parseFloat(degrees[3]), symbol: "circle", opacity: 0.9, fill: "grey"});
                overallDegree.push({x : "Max", y : parseFloat(degrees[4]), symbol: "circle", opacity: 0.9, fill: "grey"});
                overallDegree.push({x : "Min", y : parseFloat(degrees[8]), symbol: "diamond", opacity: 0.9, fill: "#525252"});
                overallDegree.push({x : "Avg", y : parseFloat(degrees[6]), symbol: "diamond", opacity: 0.9, fill: "#525252"});
                overallDegree.push({x : "Max", y : parseFloat(degrees[7]), symbol: "diamond", opacity: 0.9, fill: "#525252"});

                id += 1;
                renderArray.push(["Average Degree (overall): "+degrees[0], id]);
                id += 1;
                renderArray.push(["Maximum Degree (overall): "+degrees[1], id]);
                id += 1;
                renderArray.push(["Minimum Degree (overall): "+degrees[2], id]);

                id += 1;
                renderArray.push(["Average Degree (incoming): "+degrees[3], id]);
                id += 1;
                renderArray.push(["Maximum Degree (incoming): "+degrees[4], id]);
                id += 1;
                renderArray.push(["Minimum Degree (incoming): "+degrees[5], id]);

                id += 1;
                renderArray.push(["Average Degree (outcoming): "+degrees[6], id]);
                id += 1;
                renderArray.push(["Maximum Degree (outcoming): "+degrees[7], id]);
                id += 1;
                renderArray.push(["Minimum Degree (outcoming): "+degrees[8], id]);

                degreeArray.push(["Average Degree (overall): "+degrees[0]]);
                degreeArray.push(["Maximum Degree (overall): "+degrees[1]]);
                degreeArray.push(["Minimum Degree (overall): "+degrees[2]]);
                degreeArray.push(["Average Degree (incoming): "+degrees[3]]);
                degreeArray.push(["Maximum Degree (incoming): "+degrees[4]]);
                degreeArray.push(["Minimum Degree (incoming): "+degrees[5]]);
                degreeArray.push(["Average Degree (outcoming): "+degrees[6]]);
                degreeArray.push(["Maximum Degree (outcoming): "+degrees[7]]);
                degreeArray.push(["Minimum Degree (outcoming): "+degrees[8]]);
              }
            }
          }
          this.setState({ metrics: renderArray });
          this.setState({ overallDegree: overallDegree });
          this.setState({ ginis: giniArray });

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
                      <Text style={stylesPDF.title}>Homogeneous Graph Analysis Report</Text>
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
                          {"Number of vertices: "+resArray[1]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {"Number of vertices: "+resArray[2]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {"Reciprocity: "+resArray[3]}
                        </Text>


                      <Text style={stylesPDF.subtitle}>
                        Gini Coefficients:
                      </Text>
                        <Text style={stylesPDF.text}>
                          {giniArray[0]['x']}:{giniArray[0]['y']}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {giniArray[1]['x']}:{giniArray[1]['y']}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {giniArray[2]['x']}:{giniArray[2]['y']}
                        </Text>

                      <Text style={stylesPDF.subtitle}>
                        Relative Edge Distribution Entropy:
                      </Text>
                        <Text style={stylesPDF.text}>
                          {entropySave[0]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {entropySave[1]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {entropySave[2]}
                        </Text>

                        <Text style={stylesPDF.subtitle}>
                          Graph Degrees:
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[0]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[1]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[2]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[3]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[4]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[5]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[6]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[7]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          {degreeArray[8]}
                        </Text>
                    <Text style={stylesPDF.pageNumber} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />
                  </Page>
                </Document>
          );
          this.setState({doc: <Doc />})
        }
      }
      catch (error){
        console.log('error');
      }
    }
    fetchAsync(this.state.inputValue, this.state.checkvalue);
  }

  render() {
    const open = this.state['open'];
    const error = this.state['error'];
    const showVictory = this.state['show'];
    const metrics = this.state['metrics'];
    const overallDegree = this.state['overallDegree'];
    const ginis = this.state['ginis'];
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
            <span className="input-check" onClick={this.handleCheck}>
              <input type="checkbox" checked={this.state.checkvalue}>
              </input>
              <span></span>
              <span className="font-check">Partial Result</span>
            </span>
          <input className="input-url" type="text" placeholder=" GitHub File Path" value={this.state.inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}>
          </input>
          <div id="downinfo" onClick={this.buttonSubmit}>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} little>
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
                    <VictoryArea data={ginis}/>
                  </VictoryChart>
                </div>

                <br></br>

                <div className="victory-stack">
                  <VictoryChart domain={{ y: [-1, 15] }}>
                    <VictoryLegend x={80} y={40}
                      orientation="horizontal"
                      symbolSpacer={5}
                      gutter={20}
                      style={{title: {fontSize: 11 } }}
                      data={[
                        { name: "Outcome", symbol: { fill: "#525252", type: "diamond" }},
                        { name: "Income", symbol: { fill: "grey", type: "circle" }},
                        { name: "Overall", symbol: { fill: "black", type: "star" }},
                      ]}
                    ></VictoryLegend>
                    <VictoryScatter
                      size={7}
                      data={overallDegree}
                      style={{
                        data: {
                          fill: (d) => d.fill,
                          opacity: (d) => d.opacity
                        }
                      }}
                    />
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
      <br></br>
      </div>
    );
  }
}

export default Homo;
