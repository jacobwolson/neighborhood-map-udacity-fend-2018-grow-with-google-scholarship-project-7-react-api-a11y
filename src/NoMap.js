/* This component was written and implimented directly after viewing Doug Brown's walkthrough 
section covering handling map load errors for the project and after reviewing his associated respository,
and was thus strongly influeced by the project coach's code.
*/

import React, { Component } from 'react'

class NoMap extends Component {
    state = {
        noMapError: true,
        timeout: null
    }

    startCountdown = () => {
        let timer = window.setTimeout(this.showErrorMessage, 2000)
        this.setState({timeout: timer})
    }

    showErrorMessage = () => {
        this.setState({noMapError: null})
    }

    componentDidMount() {
        this.startCountdown()
    }

    // Clears timeout here to prevent potential leak going forward, as recommended by Doug Brown.
    componentWillUnmount() {
        window.clearInterval(this.state.timeout)
    }

    render() { 
        return(
            <div className="wrapper">
                {this.state.noMapError ? (
                    <h2 className="map-loading-message">
                    Loading map...
                    </h2>
                ) : (
                    <h3 className="map-load-error-message">
                        There was an error loading the map.<br></br>
                        Check your internet connection?<br></br>
                    </h3>
                )}
            </div>
        )
    }
}

export default NoMap