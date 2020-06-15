import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
  
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  comopnentDidMount() {

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
            <button onClick={() => {alert('save')}} className="button">SAVE</button>
            <button onClick={() => {alert('download')}} className="button">DOWNLOAD</button>
            <button onClick={() => {alert('print')}} className="button" >PRINT</button>
            </segment>
      </div>
      <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
      </div>
  )}
}

export default App
