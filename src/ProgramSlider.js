import 'rc-slider/assets/index.css'
import Slider from 'rc-slider';
import React, {Component} from 'react';
import {DoughnutChart} from './Doughnut'
import axios from 'axios'
import apiKey from './apiKey'
import {organizeProgramData} from './utils'

const style = { width: 400, margin: 50 };
const marks = {
  '0': '2015',
  25: '2016',
  50: '2017',
  75: '2018',
  '100': '2019',
};

function log(value) {
  console.log(value); //eslint-disable-line
}

export class ProgramSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 'latest',
            labels: [],
            datasets: [],
            sliderMoved: false
        }
        this.onSliderChange = this.onSliderChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    
    async onSliderChange(value) {
        console.log(this.state)
        const responseMeta = await axios.get(
            `https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${apiKey}`
        )
        let response = responseMeta.data.results[0]
        let organizedProgramData = organizeProgramData(response, this.state.year)
        this.setState({
            labels: organizedProgramData[0],
            datasets: organizedProgramData[1],
            sliderMoved: true
        })
      }
    
    handleChange(value) {
        let newYear
        if (value === 75) {
            newYear = '2018'
        } else if (value === 50) {
            newYear = '2017'
        } else if (value === 25) {
            newYear = '2016'
        } else if (value === 0) {
            newYear = '2015'
        } else {
            newYear = 'latest'
        }

        this.setState({
                year: newYear,
            })
    }


    render() {
        return ( 
            <div>
                <div style={style}>
                <Slider min={0} marks={marks} step={null} onChange={this.handleChange} onAfterChange={this.onSliderChange} defaultValue={2019} />
                </div>
                {this.state.sliderMoved ?
                <DoughnutChart labels={this.state.labels} datasets={this.state.datasets} />
                :
                <DoughnutChart labels={this.props.labels} datasets={this.props.datasets}  />
        }
            </div>
)}}

