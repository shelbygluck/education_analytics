import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import LoadingContainer from './LoadingContainer'
import { Loading } from "./loading"
import html2canvas from "html2canvas"
import pdfConverter from "jspdf"
import organizeInitialData from "./utils"
import apiKey from './apiKey'
import {DoughnutChart} from './Doughnut'
import {BarChart} from './Bar'
import {DownloadLink} from './DownloadLink'


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
            satCSV: [],
            actCSV: [],
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
                <div>
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
                        <DownloadLink data={this.state.genCSV} filename="genData.csv" />
                     </segment>
                     <segment>
                        <div className="chartContainer">
                        <h3>Race/Ethnicity</h3>
                        <DoughnutChart labels={this.state.raceCSV[0]} datasets={this.state.raceCSV[1]}  />
                        <DownloadLink data={this.state.raceCSV} filename="raceEthnData.csv" />
                        </div>
                        <div className="chartContainer">
                        <h3>Academic Programs</h3>
                        <DoughnutChart labels={this.state.programCSV[0]} datasets={this.state.programCSV[1]} />
                        <DownloadLink data={this.state.programCSV} filename="programData.csv" />
                        </div>
                     </segment>
                     <segment>
                        <div className="chartContainer">
                        <h3>SAT by Percentile</h3>
                        <BarChart labels={this.state.satCSV[0]} data25={this.state.satCSV[1]} data50={this.state.satCSV[2]} data75={this.state.satCSV[3]} />
                        <DownloadLink data={this.state.satCSV} filename="satDataBy25/50/75percentile.csv" />
                        </div>
                        <div className="chartContainer">
                        <h3>ACT By Percentile</h3>
                        <BarChart labels={this.state.actCSV[0]} data25={this.state.actCSV[1]} data50={this.state.actCSV[2]} data75={this.state.actCSV[3]} />
                        <DownloadLink data={this.state.actCSV} filename="actDataBy25/50/75percentile.csv" />
                        </div>
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
               </div> 
            <div id="footer">
               <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
               <LoadingContainer />
               <LoadingContainer />
            </div>
            </div>
            ) : (
               <Loading type="balls" color="lightseagreen"/>
            )}
         </div>
      )
   }
}

export default App
