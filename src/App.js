import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import LoadingContainer from './LoadingContainer'
import { Loading } from "./loading"
import html2canvas from "html2canvas"
import pdfConverter from "jspdf"
import organizeInitialData from "./utils"
import apiKey from './apiKey'
import {BarChart} from './Bar'
import {DownloadLink} from './DownloadLink'
import {RaceSlider} from './RaceSlider'
import {ProgramSlider} from './ProgramSlider'

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
        let input = window.document.getElementById("main")
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new pdfConverter("l", "pt")
            pdf.addImage(imgData, "JPEG", 10, 0, 680, 550)
            pdf.save("ea.pdf")
        })
        .catch((err) => console.log(err.message))
    }

    render() {
        const dataLoaded = this.state.dataLoaded
        return (
            <div id="main">
                {dataLoaded ? (
                <div id="schoolData">
                <div id="container">
                    <div>
                        <div className="segment">
                            <p className="small">{this.state.name}</p>
                            <p className="small">{this.state.website}</p>
                        </div>
                        <div className="segment">
                            <p className="small">{this.state.city}</p>
                            <p className="small">{this.state.state}</p>
                            <p className="small">{this.state.zip}</p>
                            <p className="small">Student Population: {this.state.size}</p>
                        <DownloadLink data={this.state.genCSV} filename="genData.csv" />
                     </div>
                     <div className="segment">
                        <div className="chartContainer">
                        <h3>Race/Ethnicity</h3>
                        <RaceSlider labels={this.state.raceCSV[0]} datasets={this.state.raceCSV[1]} />
                        <DownloadLink data={this.state.raceCSV} filename="raceEthnData.csv" />
                        </div>
                        <div className="chartContainer">
                        <h3>Academic Programs</h3>
                        <ProgramSlider labels={this.state.programCSV[0]} datasets={this.state.programCSV[1]} />
                        <DownloadLink data={this.state.programCSV} filename="programData.csv" />
                        </div>
                     </div>
                     <div className="segment">
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
                     </div>
                  </div>
                  <div className="segment">
                     <p onClick={this.saveAsPDF} className="button">
                        SAVE
                     </p>
                     <p onClick={() => window.print()} className="button">
                        PRINT
                     </p>
                  </div>
               </div> 
            <div id="footer">
               <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
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
