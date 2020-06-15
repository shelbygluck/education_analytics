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
        <p className="small">school name/alias</p>
        <p className="small">school website</p>
         <div className="rowMultiples">
           <p className="small">city</p>
           <p className="small">state</p>
           <p className="small">zip</p>
         </div>
         <p className="small">Student Population: </p>
         <p className="large">Graph 1</p>
         <p className="large">Graph 2</p>
         <p className="large">Graph 3</p>
         <div className="rowMultiples">
            <button onClick={() => {alert('save')}} className="button">SAVE</button>
            <button onClick={() => {alert('download')}} className="button">DOWNLOAD</button>
            <button onClick={() => {alert('print')}} className="button" >PRINT</button>
         </div>
      </div>
      <h2 id="bottomLogo">EDUCATION ANALYTICS</h2>
      </div>
  )}
}

export default App
