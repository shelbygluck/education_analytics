import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import { Loading } from "./loading"
import html2canvas from "html2canvas"
import pdfConverter from "jspdf"
import { CSVLink } from "react-csv"
import organizeInitialData from "./utils"
import apiKey from './apiKey'

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         name: "",
         website: "",
         alias: "",
         city: "",
         state: "",
         zip: "",
         size: 0,
         programsByPercent: {},
         raceBreakdown: {},
         inStateTuition: 0,
         outStateTuition: 0,
         actScores: {},
         satScores: {},
         genCSV: [],
         programCSV: [],
         raceCSV: [],
         testCSV: [],
         dataLoaded: false,
      }
   }

   async componentDidMount() {
      const responseMeta = await axios.get(
         `https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${apiKey}`
      )
      let response = responseMeta.data.results[0]
      const data = organizeInitialData(response)
      this.setState(data)
      this.setState({ dataLoaded: true })
   }

   saveAsPDF = () => {
      let input = window.document.getElementById("schoolData")
      html2canvas(input)
         .then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new pdfConverter("l", "pt")
            pdf.addImage(imgData, "JPEG", 15, 110, 800, 450)
            pdf.save("ea.pdf")
         })
         .catch((err) => console.log(err.message))
   }

   render() {
      const dataLoaded = this.state.dataLoaded
      return (
         <div id="main">
            {dataLoaded ? (
               <div id="container">
                  <div id="schoolData">
                     <segment>
                        <p className="small">{this.state.name}</p>
                        <p className="small">{this.state.website}</p>
                     </segment>
                     <segment>
                        <p className="small">{this.state.city}</p>
                        <p className="small">{this.state.state}</p>
                        <p className="small">{this.state.zip}</p>
                        <p className="small">
                           Student Population: {this.state.size}
                        </p>
                     </segment>
                     <segment>
                        <p className="large">Graph 1</p>
                        <p className="large">Graph 2</p>
                        <p className="large">Graph 3</p>
                     </segment>
                  </div>
                  <segment>
                     <p onClick={this.saveAsPDF} className="button">
                        SAVE
                     </p>
                     <p onClick={() => window.print()} className="button">
                        PRINT
                     </p>
                  </segment>
                  <segment>
                     <p className="downloadBar">
                        DOWNLOAD DATA:
                        <CSVLink
                           className="singleDownload"
                           data={this.state.genCSV}
                           ref={(r) => (this.csvLink = r)}
                           filename={"genData.csv"}
                           target="_blank"
                        >
                           GENERAL
                        </CSVLink>
                        <CSVLink
                           className="singleDownload"
                           data={this.state.raceCSV}
                           ref={(r) => (this.csvLink = r)}
                           filename={"raceEthnData.csv"}
                           target="_blank"
                        >
                           RACE/ETHNICITY
                        </CSVLink>
                        <CSVLink
                           className="singleDownload"
                           data={this.state.programCSV}
                           ref={(r) => (this.csvLink = r)}
                           filename={"programData.csv"}
                           target="_blank"
                        >
                           PROGRAMS
                        </CSVLink>
                     </p>
                  </segment>
               </div>
            ) : (
               <Loading type="balls" color="lightseagreen" />
            )}
            <footer>
               <Loading type="bars" color="lightcoral" />
               <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
               <Loading type="bars" color="darkslategray" />
            </footer>
         </div>
      )
   }
}

export default App