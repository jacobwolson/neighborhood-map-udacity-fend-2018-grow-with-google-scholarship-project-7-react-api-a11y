import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ListView from './ListView'

class makeMarkers extends Component {

makeMarkers = (markersList) => {
    let markerProps = []
    let markers = []
 
    markersList.map((marker, i) => {
      console.log("making markers")
      let theseProps = {
        key: marker.name,
        index: i,
        name: marker.name,
        position: marker.coordinates
      }
      let thisMarker = new this.props.google.maps.Marker({
        position: marker.coordinates,
        map: this.state.mapObject
      })
      thisMarker.addListener('click', () => {
        this.onMarkerClick(theseProps, thisMarker)
      })
      markerProps.push(theseProps)
      markers.push(thisMarker)
     
      return thisMarker
    })
    this.setState({
      markers: markers,
      markerProps: markerProps,
    })
  }

  render() {}

}

export default makeMarkers