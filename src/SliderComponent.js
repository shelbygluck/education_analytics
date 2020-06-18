import 'rc-slider/assets/index.css'
import Slider, { Range } from 'rc-slider';
import React, {Component} from 'react';
import {DoughnutChart} from './Doughnut'

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

export class SliderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: '2019'
        }
    }


    
    onSliderChange = value => {
        console.log(this.state)
      };
    
      handleChange = value => {
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
            newYear = '2019'
        }
        this.setState({
            year: newYear
        })
      }


    render() {
        return ( 
            <div>
                <div style={style}>
                <Slider min={0} marks={marks} step={null} onChange={this.handleChange} onAfterChange={this.onSliderChange} defaultValue={2019} />
                </div>
                {(this.state.year == '2019') ?
                <DoughnutChart labels={this.props.labels} datasets={this.props.datasets}  />
                :
                <DoughnutChart labels={['yes', 'no']} datasets={[1, 2, 3]} />
        }
            </div>
)}}

