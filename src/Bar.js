import {Bar} from 'react-chartjs-2'
import React, {Component} from 'react'

export class BarChart extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="bar">
                    <Bar
                        data={{
                            labels: this.props.labels,
                            datasets: [{
                                label: '25th percentile',
                                backgroundColor: 'lightseagreen',
                                stack: 'Stack 0',
                                data: this.props.data25
                            }, {
                                label: '50th percentile',
                                backgroundColor: 'darkslategray',
                                stack: 'Stack 0',
                                data: this.props.data50
                            }, {
                                label: '75th percentile',
                                backgroundColor: 'lightcoral',
                                stack: 'Stack 0',
                                data: this.props.data75
                            }
                        ]
                        }}
                        height={300}
                        options={{
                            scales: {
                                xAxes: [{ stacked: true }],
                                yAxes: [{
                                  stacked: false,
                                  ticks: {
                                    beginAtZero: true,
                                  },
                                }]
                            },
                            legend: {
                                display: 'true'
                            }
                        }
                        }
                    />
                    <br />
            </div>
        )
    }
}