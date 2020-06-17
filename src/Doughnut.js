import {Pie} from 'react-chartjs-2'
import React, {Component} from 'react'

export class DoughnutChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labels: this.props.labels,
            datasets: [{
                data: this.props.datasets,
                backgroundColor: ['lightcoral', 'lightseagreen']
            }]
        }
    }

    render() {
        // console.log(this.props.datasets)
        return (
            <div className="chart">
                    <h3>Race Breakdown</h3>
                    <Pie
                        data={{
                            labels: this.state.labels,
                            datasets: this.state.datasets
                        }}
                        height='180%'
                    />
                    <br />
            </div>
        )
    }
}