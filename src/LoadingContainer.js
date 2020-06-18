import { Loading } from "./loading"
import React, {Component} from 'react'

class DownloadLink extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="logo">
            <Loading type="bars" color="darkslategray" />
            <Loading type="bars" color="lightseagreen" />
            <Loading type="bars" color="lightcoral" />
            <Loading type="bars" color="lightseagreen" />
            <Loading type="bars" color="darkslategray" />
            </div>
        )
    }
}

export default DownloadLink