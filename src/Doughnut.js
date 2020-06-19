import {defaults, Doughnut} from 'react-chartjs-2'
import React, {Component} from 'react'
defaults.global.animation.duration = 2000

export class DoughnutChart extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="chart">
                    <Doughnut
                        data={{
                            labels: this.props.labels,
                            datasets: [
                            {
                                data: this.props.datasets,
                                backgroundColor: [    
                                      'lightgreen',
                                      'peachpuff',
                                      'gray',
                                      'bluegreen',
                                      'lightslategray',
                                      'lightseagreen',
                                      'darkslategray',       
                                      'white',
                                      'lightcoral',
                                      'beige',
                                      'darkblue'
                            ]
                            }]
                        }}
                        height={200}
                        options={{
                            legend: {
                                display: true,
                                position: 'left',
                                align: 'center'
                            }
                        }}
                    />
                    <br />
            </div>
        )
    }
}
