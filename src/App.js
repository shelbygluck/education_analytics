import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  async componentDidMount() {
    const response = await axios.get('https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=iP5R8AwSIZG19HgI2rwBYb4xwmYIeNYbyNUizpqC')
    console.log(response.data)
  }

  render() {   
    return (
      <div id="main">
      <div id="container">
        <segment>
            <p className="small">school name/alias</p>
            <p className="small">school website</p>
          </segment>
          <segment>
           <p className="small">city</p>
           <p className="small">state</p>
           <p className="small">zip</p>
          <p className="small">Student Population: </p>
          </segment>
          <segment>
            <p className="large">Graph 1</p>
            <p className="large">Graph 2</p>
            <p className="large">Graph 3</p>
          </segment>
          <segment>
            <p onClick={() => {alert('save')}} className="button">SAVE</p>
            <p onClick={() => {alert('download')}} className="button">DOWNLOAD</p>
            <p onClick={() => {alert('print')}} className="button" >PRINT</p>
            </segment>
      </div>
      <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
      </div>
  )}
}

export default App
