import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapDisplay extends Component {
    state = {
        map: null
    }

    componentDidMount = () => {
    }

    mapReady = (props, map) => {
        this.setState({map})
    }

    render () {
        const style = {
            width: '100%',
            height: '100%'
        }

        const center = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
            >
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o'
})(MapDisplay)