import {defaults, Doughnut} from 'react-chartjs-2'
import React, {Component} from 'react'
defaults.global.legend.display = false
defaults.global.title.display = true

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
                            labels: this.state.labels,
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
                    />
                    <br />
            </div>
        )
    }
}