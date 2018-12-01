/* This component was written and implimented after viewing Udacity Doug Brown's walkthrough 
* section covering handling map load errors for the project and reviewing the associated respository:
* https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be.
*/

// Consulted: http://vaidehijoshi.github.io/blog/2015/01/06/the-final-countdown-using-javascripts-setinterval-plus-clearinterval-methods/

import React, { Component } from 'react'

class NoMap extends Component {
    state = {
        noMapError: true,
    }

    timer

    // Triggers a re-render and flips the "loading" message to an "error" message in '.render()', below.
    showErrorMessage = () => {
        this.setState({noMapError: null})
    }

    componentDidMount() {
        this.timer = window.setTimeout(this.showErrorMessage, 2000)
    }

    /* Clears things out and prevents memory leaks going forward if map does load and component unmounts; 
    * implimented as recommended by Doug Brown, and as prven necessary by a console error message that appeared when running 
    * a version of this code without the `componentWillUnmount()` and `.clearTimeout()` methods here: "Warning: Can't perform a 
    * React state update on an unmounted component ..."
    */
    componentWillUnmount() {
        window.clearTimeout(this.timer)
    }

    render() { 
        return(
            <div role="presentation" className="no-map-message-container">
                {this.state.noMapError ? (
                    // If `noMapError` hasn't gotten flipped to "false" yet.
                    <h2 className="map-loading-message">
                        Loading map...
                    </h2>
                    // If `.showErrorMessage()` has flipped 'noMapError` to false.  
                ) : (
                    <h3 className="map-load-error-message">
                        There was an error loading the map.<br></br><br></br>
                        Try checking your internet connection?<br></br>
                    </h3>
                )}
            </div>
        )
    }
}

export default NoMap
