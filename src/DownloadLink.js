import React, {Component} from 'react'
import { CSVLink } from "react-csv"

export class DownloadLink extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <CSVLink
            className="singleDownload"
            data={this.props.data}
            ref={(r) => (this.csvLink = r)}
            filename={this.props.filename}
            target="_blank"
            >
            DOWNLOAD THIS DATA
            </CSVLink>
        )
    }
}