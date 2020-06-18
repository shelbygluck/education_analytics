import 'rc-slider/assets/index.css'
import Slider, { Range } from 'rc-slider';
import React, {Component} from 'react';

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
    }
    
    render() {
        return ( 
            <div>
                <div style={style}>
                <Slider min={0} marks={marks} step={null} onChange={console.log()} defaultValue={2019} />
                </div>
            </div>

)}}

