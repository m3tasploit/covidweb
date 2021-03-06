import React, { Component } from "react";
import { url } from "../Configure";
import "../Styles/home.css";
import * as MaterialUI from "@material-ui/core";
import StateWise from "../Graphs/StateWise";
import { Animated } from "react-animated-css";
import logosm from "../Media/logosm.png";
import iedclog from "../Media/iedcw.png";
import Loader from "../Extras/Loader";
import DistrictWiseBar from "../Graphs/DistrictWiseBar";
import KeralaMap from "../Graphs/KeralaMap";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      indiaTdeath: 0,
      worldTdeath: 0,
      worldTcases: 0,
      indiaTcases: 0,
      worldRecover: 0,
      indiaRecover: 0,
      globalPredict: 0,
      indiaPredict: 0,
      keralaPredict: 0,
      keralaTdeath: 0,
      keralaTCases: 0,
      keralaRecover: 0,
      stateWiseRecover: 0,
      isLoading: false,
      keralaCurrent: {
        deaths: 0,
        confirmed: 0,
        recovered: 0
      },

      componentStatesProps: {
        district: 'District',
        active_cases: 0,
        observation: 0
      }
    };
  }
  componentDidMount() {
    fetch(`${url}/homePage`)
      .then(r => r.json())
      .then(res => {

        this.setState({
          keralaPredict: res["prediction"]["arr"][0][0],
          indiaPredict: res["prediction"]["arr"][0][1],
          globalPredict: res["prediction"]["arr"][0][2],
          keralaRecover: parseInt(res["kerala"]["Cured/Discharged/Migrated"]),
          keralaTdeath: parseInt(res["kerala"]["Death"]),
          indiaRecover: res["india"]["TotalRecovered"],
          indiaTdeath: res["india"]["TotalDeaths"],
          worldRecover: res["global"]["recovered"],
          worldTdeath: res["global"]["deaths"],
          keralaTCases: res['kerala']['Total Confirmed cases *'],
          worldTcases: res["global"]["cases"],
          indiaTcases: res["india"]["ActiveCases"],
          isLoading: true,
          keralaCurrent: {
            deaths: parseInt(res["keralaLive"]["deaths"]),
            recovered: parseInt(res["keralaLive"]["recovered"]),
            confirmed: parseInt(res["keralaLive"]["confirmed"])
          }
        });
        const sdata = res["stateWiseData"];

        sdata.pop();
        sdata.pop();
        this.setState({ data: sdata });
      });


  }

  render() {



    return (
      <>
        {this.state.isLoading === true ? (
          <div>
            {window.innerWidth > 800 ? (
              <div style={{ marginTop: 100, width: "100%" }}>
                <div className="Card-status">
                  <MaterialUI.Paper className="statusBoard" elevation={10}>
                    <h3>Kerala</h3>
                    <div>
                      <p style={{ color: "#3792cf" }}>Active Cases</p>
                      <b
                        style={{ fontSize: 25, color: "#3792cf" }}

                      >
                        {this.state.keralaTCases -
                          this.state.keralaTdeath -
                          this.state.keralaRecover}
                      </b>
                    </div>
                    <div>
                      <p style={{ color: "#cf3737" }}>Deaths</p>
                      <b
                        style={{ fontSize: 25, color: "#cf3737" }}

                      >
                        {this.state.keralaCurrent.deaths}
                      </b>
                    </div>
                    <div >
                      <p style={{ color: "#239c5a" }}>Recovered</p>
                      <b
                        style={{ fontSize: 25, color: "#239c5a" }}

                      >
                        {this.state.keralaRecover}
                      </b>

                    </div>
                    <br />
                  </MaterialUI.Paper>
                  <MaterialUI.Paper className="statusBoard" elevation={10}>
                    <h3>India</h3>
                    <div>
                      <p style={{ color: "#3792cf" }}>Active Cases</p>
                      <b
                        style={{ fontSize: 25, color: "#3792cf" }}

                      >
                        {this.state.indiaTcases}
                      </b>
                    </div>
                    <div>
                      <p style={{ color: "#cf3737" }}>Deaths</p>
                      <b
                        style={{ fontSize: 25, color: "#cf3737" }}

                      >
                        {this.state.indiaTdeath}
                      </b>
                    </div>
                    <div>
                      <p style={{ color: "#239c5a" }}>Recovered</p>
                      <b
                        style={{ fontSize: 25, color: "#239c5a" }}

                      >
                        {this.state.indiaRecover}
                      </b>
                    </div>
                  </MaterialUI.Paper>
                  <MaterialUI.Paper className="statusBoard" elevation={10}>
                    <h3>World</h3>
                    <div>
                      <p style={{ color: "#3792cf" }}>Active Cases</p>
                      <b
                        style={{ fontSize: 25, color: "#3792cf" }}

                      >
                        {this.state.worldTcases -
                          this.state.worldTdeath -
                          this.state.worldRecover}
                      </b>
                    </div>
                    <div >
                      <p style={{ color: "#cf3737" }}>Deaths</p>
                      <b
                        style={{ fontSize: 25, color: "#cf3737" }}

                      >
                        {this.state.worldTdeath}
                      </b>
                    </div>
                    <div>
                      <p style={{ color: "#239c5a" }}>Recovered</p>
                      <b
                        style={{ fontSize: 25, color: "#239c5a" }}

                      >
                        {this.state.worldRecover}
                      </b>
                    </div>
                  </MaterialUI.Paper>
                </div>
                <br />

                <MaterialUI.Paper elevation={10} className="mapView">
                  <br />
                  <center>  <h2>KERALA SPREAD TRENDS</h2></center>
                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: "column", textAlign: 'center' }}>
                      <h2>{this.state.componentStatesProps.district}</h2>

                      <div style={{ width: "100%", display: 'flex', margin: '10px' }}>
                        <div style={{ backgroundColor: '#ccdeff', borderRadius: 15, width: '100%', display: 'flex', flexDirection: 'column', margin: '10px' }}>
                          <br />
                          <p style={{color:'#337aff'}} className="props" >Observation</p>
                          <br />
                          <b style={{color:'#337aff',fontSize:25}}>{this.state.componentStatesProps.observation}</b>
                          <br />
                        </div>

                        <div style={{ backgroundColor: '#fce4e4', borderRadius: 15, width: '100%', display: 'flex', flexDirection: 'column', margin: '10px' }}>
                          <br />
                          <p style={{color:'#f54f4f'}} className="props" >Active Cases</p>
                          <br />
                          <b style={{color:'#f54f4f',fontSize:25}}>{this.state.componentStatesProps.active_cases}</b>
                          <br />
                        </div>
                      </div>
                    </div>

                    <KeralaMap setContent={(obj) => {


                      this.setState({
                        componentStatesProps: {
                          active_cases: obj.active_cases,
                          observation: obj.observation,
                          district: obj.district
                        }
                      })
                      
                    }} />

                  </div>
                </MaterialUI.Paper>

                <br />
                <h3 style={{ marginLeft: window.innerWidth * 0.4 }}>
                  StateWise Reports(India)
                </h3>

                <center>
                  <StateWise />
                </center>



                {/* <MaterialUI.Paper  elevation={10} style={{
        backgroundColor:"#4f5a90",
        width:200,
       position:"absolute",
       zIndex:99,marginLeft:window.innerWidth*.02,marginTop:window.innerHeight*.2}}>
           <br/>
            <h3 style={{color:"white"}}>Our Today's Prediction</h3>
    <p style={{color:"white"}}>On {'\n'} Confirming Cases</p>
    <p style={{color:"white"}}>{day}</p>
    <p style={{color:"white"}}>Kerala </p>
    <b style={{color:"white",fontSize:25}}>{this.state.keralaPredict}</b>
        <p style={{color:"white"}}>India </p>
    <b style={{color:"white",fontSize:25}}>{this.state.indiaPredict}</b>
        <p style={{color:"white"}}>World</p>
        <b style={{color:"white",fontSize:25}}>{this.state.globalPredict}</b>
        <br/><br/>
        <a style={{color:"white",fontSize:15}} href="/predict">More</a>
          <br/>  <br/><br/>
       
    </MaterialUI.Paper> */}

                {/* </div> */}
                <br />
                <center>
                  <MaterialUI.Paper
                    style={{ width: window.innerWidth * 0.8 }}
                    elevation={10}
                  >
                    <br />
                    <h3>Districtwise Confirmed Reports (Kerala)</h3>
                    <DistrictWiseBar />
                    <br />
                    <p
                      style={{
                        fontFamily: "Lato",
                        fontSize: 12,
                        color: "gray",
                        textAlign: "center"
                      }}
                    >
                      *data updated in reference with covid19india.org
                    </p>
                    <br />
                  </MaterialUI.Paper>
                </center>
                <br />
                <br />
                <br />
                <footer>
                  <div className="footer">
                    <br />
                    <a href="http://sscollege.ac.in">
                      {" "}
                      <img
                        alt='lgosm'
                        src={logosm}
                        style={{
                          width: "75px",
                          height: "75px",
                          position: "absolute",
                          marginLeft: "20px"
                        }}
                      />
                    </a>
                    <center>
                      <a
                        href="http://sscollege.ac.in"
                        style={{ textDecoration: "none" }}
                      >
                        <p style={{ color: "white" }}>
                          <b style={{ fontSize: 20 }}>
                            Sullamussalam Science College |
                          </b>
                          <l style={{ fontSize: 14 }}>Powered By IEDC </l>
                        </p>
                      </a>
                    </center>
                    <a href="http://iedc.sscollege.ac.in">
                      {" "}
                      <img
                        alt='sm'
                        src={iedclog}
                        style={{
                          width: "100px",
                          height: "100px",
                          position: "absolute",
                          marginLeft: window.innerWidth * 0.9,
                          marginTop: -75
                        }}
                      />
                    </a>
                  </div>
                </footer>
              </div>
            ) : (
                <div>
                  {/*Mobile View is below*/}
                  <br /> <br /> <br />
                  <div>
                    <Animated animationIn="fadeIn" animationInDuration={2500}>
                      <MaterialUI.Paper
                        style={{
                          textAlign: "center",
                          margin: "auto"
                        }}
                      >
                        <br />
                        <center>
                          <h2>Kerala</h2>
                        </center>
                        <div className="liveUpdates">
                          <div className="Status">
                            <p style={{ color: "#3792cf" }}>Active Cases</p>
                            <b
                              style={{ fontSize: 25, color: "#3792cf" }}
                              className="dataP"
                            >
                              {this.state.keralaTCases -
                                this.state.keralaTdeath -
                                this.state.keralaRecover}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#cf3737" }}>Deaths</p>
                            <b
                              style={{ fontSize: 25, color: "#cf3737" }}
                              className="dataP"
                            >
                              {this.state.keralaCurrent.deaths}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#239c5a" }}>Recovered</p>
                            <b
                              style={{ fontSize: 25, color: "#239c5a" }}
                              className="dataP"
                            >
                              {this.state.keralaRecover}
                            </b>
                          </div>
                        </div>
                      </MaterialUI.Paper>
                    </Animated>
                    <Animated animationIn="fadeIn" animationInDuration={2500}>
                      <MaterialUI.Paper
                        style={{
                          textAlign: "center",
                          margin: "auto"
                        }}
                      >
                        <h2>India</h2>

                        <div className="liveUpdates">
                          <div className="Status">
                            <p style={{ color: "#3792cf" }}>Active Cases</p>
                            <b
                              style={{ fontSize: 25, color: "#3792cf" }}
                              className="dataP"
                            >
                              {this.state.indiaTcases -
                                this.state.indiaTdeath -
                                this.state.indiaRecover}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#cf3737" }}>Deaths</p>
                            <b
                              style={{ fontSize: 25, color: "#cf3737" }}
                              className="dataP"
                            >
                              {this.state.indiaTdeath}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#239c5a" }}>Recovered</p>
                            <b
                              style={{ fontSize: 25, color: "#239c5a" }}
                              className="dataP"
                            >
                              {this.state.indiaRecover}
                            </b>
                          </div>
                        </div>
                      </MaterialUI.Paper>
                    </Animated>
                    <Animated animationIn="fadeIn" animationInDuration={2500}>
                      <MaterialUI.Paper
                        style={{
                          textAlign: "center",
                          margin: "auto"
                        }}
                      >
                        <center>
                          <h2>World</h2>
                        </center>
                        <div className="liveUpdates">
                          <div className="Status">
                            <p style={{ color: "#3792cf" }}>Active Cases</p>
                            <b
                              style={{ fontSize: 25, color: "#3792cf" }}
                              className="dataP"
                            >
                              {this.state.worldTcases -
                                this.state.worldTdeath -
                                this.state.worldRecover}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#cf3737" }}>Deaths</p>
                            <b
                              style={{ fontSize: 25, color: "#cf3737" }}
                              className="dataP"
                            >
                              {this.state.worldTdeath}
                            </b>
                          </div>
                          <div className="Status">
                            <p style={{ color: "#239c5a" }}>Recovered</p>
                            <b
                              style={{ fontSize: 25, color: "#239c5a" }}
                              className="dataP"
                            >
                              {this.state.worldRecover}
                            </b>
                          </div>
                        </div>
                        <p
                          style={{
                            fontFamily: "Lato",
                            fontSize: 12,
                            color: "gray"
                          }}
                        >
                          *data updated in reference with MoHFW
                      </p>
                        <br />
                      </MaterialUI.Paper>
                    </Animated>
                  </div>
                  <MaterialUI.Paper elevation={10} style={{width:window.innerWidth,margin:0}} className="mapView">
                  <br />
                  <center>  <h2>KERALA SPREAD TRENDS</h2></center>
                  
                    <div style={{ display: 'flex', flexDirection: "column", textAlign: 'center' }}>
                      <h2>{this.state.componentStatesProps.district}</h2>

                      <div style={{ width: "100%", display: 'flex', margin: '5px' }}>
                        <div style={{ backgroundColor: '#ccdeff', borderRadius: 15, width: '75%', display: 'flex', flexDirection: 'column', margin: '2px' }}>
                          <br />
                          <p style={{color:'#337aff'}} className="props" >Observation</p>
                          <br />
                          <b style={{color:'#337aff',fontSize:25}}>{this.state.componentStatesProps.observation}</b>
                          <br />
                        </div>

                        <div style={{ backgroundColor: '#fce4e4', borderRadius: 15, width: '75%', display: 'flex', flexDirection: 'column', margin: '2px' }}>
                          <br />
                          <p style={{color:'#f54f4f'}} className="props" >Active Cases</p>
                          <br />
                          <b style={{color:'#f54f4f',fontSize:25}}>{this.state.componentStatesProps.active_cases}</b>
                          <br />
                        </div>
                      </div>
                    </div>
                          <center>
                    <KeralaMap setContent={(obj) => {


                      this.setState({
                        componentStatesProps: {
                          active_cases: obj.active_cases,
                          observation: obj.observation,
                          district: obj.district
                        }
                      })
                     
                    }} />
</center>
                  
                </MaterialUI.Paper>
                  <Animated animationIn="fadeInUp" animationInDuration={4000}>
                    <h3>Statewise Reports (India)</h3>
                    <StateWise />
                  </Animated>
                  <MaterialUI.Paper elevation={10}>
                    <h3>Districtwise Confirmed Reports (Kerala)</h3>
                    <DistrictWiseBar />
                    <br />
                  </MaterialUI.Paper>
               
                  {/* <MaterialUI.Paper elevation={10} style={{
        backgroundColor:"#4f5a90",
        width:window.innerWidth,height:280,
        alignSelf:"center",
       
        }} >
            <br/>
          <center>  <h3 style={{color:"white"}}>Our Today's Prediction</h3>
          <p style={{color:"white"}}>On Confirming Cases</p>
          <p style={{color:"white"}}>{day}</p>
          <div style={{display:"flex"}}>
              
        <p style={{color:"white",marginRight:window.innerWidth*.2,marginLeft:window.innerWidth*.1}}>Kerala</p>
        <p style={{color:"white",marginRight:window.innerWidth*.15}}>India</p>
        <p style={{color:"white"}}>World</p>
        </div>
        <div style={{display:"flex"}}>
    <b style={{color:"white",fontSize:25,marginLeft:window.innerWidth*.1,marginRight:window.innerWidth*.2}}>{this.state.keralaPredict}</b>
       
        <b style={{color:"white",fontSize:25,marginRight:window.innerWidth*.1}}>{this.state.indiaPredict}</b>
        
        <b style={{color:"white",fontSize:25}}>{this.state.globalPredict}</b>
        </div>
        <br/>
        <a style={{color:"white",fontSize:15}} href="/predict">More</a>
        <br/><br/>
        </center>
    </MaterialUI.Paper> */}
                  <br />
                  <br />
                  <br />
                </div>
              )}
          </div>
        ) : (
            <Loader />
          )}
      </>
    );
  }
}
