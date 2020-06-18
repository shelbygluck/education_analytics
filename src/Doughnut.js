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
                                      'lightslategray',
                                      'lightseagreen',
                                      'darkslategray',       
                                      'white',
                                      'lightcoral',
                                      'lightseagreen',
                                      'lightslategray',
                                      'darkslategray',       
                                      'white',
                                      'lightcoral',
                                      'lightslategray',
                                      'lightseagreen',
                                      'darkslategray',       
                                      'white',
                                      'lightcoral',
                                      'lightslategray',
                                      'lightseagreen',
                                      'darkslategray',       
                                      'white',
                                      'lightcoral',
                            ]
                            }]
                        }}
                        height='300%'
                        options={{
                            legend: {
                                display: false
                            }
                        }}
                    />
                    <br />
            </div>
        )
    }
}
