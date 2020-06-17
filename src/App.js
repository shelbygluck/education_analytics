import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Loading} from './loading'
import html2canvas from 'html2canvas'
import pdfConverter from 'jspdf'
import {CSVLink} from "react-csv"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      website: '',
      alias: '',
      city: '',
      state: '',
      zip: '',
      size: 0,
      programsByPercent: {},
      raceBreakdown: {},
      inStateTuition: 0,
      outStateTuition: 0,
      actScores: {},
      satScores: {},
      dataLoaded: false,
      genData: [],
      programData: [],
      raceData: [],
      testData: []
    }
  }
  
  async componentDidMount() {
    const response = await axios.get('https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=iP5R8AwSIZG19HgI2rwBYb4xwmYIeNYbyNUizpqC')
    const data = response.data.results[0]
    console.log(data)
    let name = data.school.name
    if (data.school.alias != null) {name = `${data.school.name} - ${data.school.alias}`}
    this.setState({
        name: name,
        website: data.school.school_url,
        city: data.school.city,
        state: data.school.state,
        zip: data.school.zip,
        size: data.latest.student.size,
        programsByPercent: data.latest.academics.program_percentage,
        raceBreakdown: data.latest.student.demographics.race_ethnicity,
        inStateTuition: data.latest.cost.tuition.out_of_state,
        outStateTuition: data.latest.cost.tuition.in_state,
        actScores: data.latest.admissions.act_scores,
        satScores: data.latest.admissions.sat_scores,
        dataLoaded: true
    })
    
    const programHeader = Object.keys(data.latest.academics.program_percentage)
    const programAccessors = Object.values(data.latest.academics.program_percentage)

    const raceHeader = Object.keys(data.latest.student.demographics.race_ethnicity)
    const raceAccessors = Object.values(data.latest.student.demographics.race_ethnicity)

    const actHeader = Object.keys(data.latest.admissions.act_scores)
    const actAccessors = Object.values(data.latest.admissions.act_scores)

    const satHeader = Object.keys(data.latest.admissions.sat_scores)
    const satAccessors = Object.values(data.latest.admissions.act_scores)

    const genData = [
      ['name', 'website', 'city', 'state', 'zip', 'size'],
      [data.school.name, data.school.school_url, data.school.city, data.school.state, data.school.zip, data.latest.student.size],
    ]

    const programData = [
      [programHeader],
      [programAccessors]
    ]

    const raceData = [
      [raceHeader],
      [raceAccessors]
    ]

    const testData = [
      [actHeader, satHeader],
      [actAccessors, satAccessors]
    ]
    
    console.log(data.latest.student.demographics.race_ethnicity)
    this.setState({
      genData: genData,
      programData: programData,
      raceData: raceData,
      testData: testData
    })
    }

  saveAsPDF = () => {
    let input = window.document.getElementById('schoolData')
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new pdfConverter('l', 'pt')
        pdf.addImage(imgData, 'JPEG', 15, 110, 800, 450)
        pdf.save('ea.pdf')
      })
      .catch(err => console.log(err.message))
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
            <p className="small">Student Population: {this.state.size}</p>
            </segment>
            <segment>
              <p className="large">Graph 1</p>
              <p className="large">Graph 2</p>
              <p className="large">Graph 3</p>
            </segment>
            </div>
            <segment>
              <p onClick={this.saveAsPDF}  className="button">SAVE</p>
              <p onClick={() => {alert('print')}} className="button">PRINT</p>
            </segment>
            <segment>
              <CSVLink
                      className="button"
                      data={this.state.genData}
                      ref={(r) => this.csvLink = r}
                      filename={'genData.csv'}
                      target="_blank"
                      >DOWNLOAD (general data)
                  </CSVLink>
                  <CSVLink
                      className="button"
                      data={this.state.raceData}
                      ref={(r) => this.csvLink = r}
                      filename={'raceEthnData.csv'}
                      target="_blank"
                    >DOWNLOAD (race/ethnicity data)
                  </CSVLink>
                  <CSVLink
                      className="button"
                      data={this.state.programData}
                      ref={(r) => this.csvLink = r}
                      filename={'programData.csv'}
                      target="_blank"
                      >DOWNLOAD (program data)
                    </CSVLink>
              </segment>
        </div>
       ) : <Loading type="balls" color="lightseagreen" />}
       <footer>
          <Loading type="bars" color="lightcoral" />
          <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
          <Loading type="bars" color="darkslategray" />
      </footer>
      </div>
  )}
}

export default App
