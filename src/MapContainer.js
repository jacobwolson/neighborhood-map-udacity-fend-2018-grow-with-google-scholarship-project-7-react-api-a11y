/* Cnosulted/sources, general: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
    https://github.com/fullstackreact/google-maps-react/blob/master/README.md
*/
// Consulted for dynamically adding markers: https://stackoverflow.com/a/43938322

/* consulted: https://stackoverflow.com/a/53322289
https://stackoverflow.com/a/47563854
https://reactjs.org/docs/lifting-state-up.html#lifting-state-up
*/

import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ListView from './ListView'


// ListView Props

// const buttonOneText = "Show All"

// const buttonTwoText = "Show North of Cal Anderson"




export class MapContainer extends Component {
 
  state = {
    markers: null,
    markerProps: null,
    mapObject: null,
    showingInfoWindow: false, 
    activeMarker: {},          
    selectedPlace: {},     
  };

  onMapReady = (mapProps, map) => {
    this.setState({mapObject: map})
    this.makeMarkers(this.props.markers)
  }

  // https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
  // https://developers.google.com/maps/documentation/javascript/markers
  makeMarkers = (markersList) => {
    let markerProps = []
    let markers = []
 
    markersList.map((marker, i) => {
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

  onMarkerClick = (props, marker, e) => 
    {this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })};

  onClose = props => {
    if (this.state.infoWindowDisplayed) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div className="container">
      <div>
      <ListView
        markers={this.props.markers}
        associatedMarkerProps={this.state.markerProps}
        associatedMarkers={this.state.markers}
        onClickLI={this.onMarkerClick}
        
        buttonOneOnClick={this.props.buttonOneOnClick}
        buttonOneText={this.props.buttonOneText}
        buttonTwoOnClick={this.props.buttonTwoOnClick}
        buttonTwoText={this.props.buttonTwoText}
      />
      </div>
      <div>
      <Map 
        google={this.props.google}
        onReady={this.onMapReady}
        onClick={this.onMapClicked}
        style={this.props.mapStyles} 
        zoom={this.props.zoom}
        initialCenter={this.props.initialCenter}
      >
        

        <InfoWindow
          buttonOneOnClick={this.props.buttonOneOnClick}
          buttonOneText={this.props.buttonOneText}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>

      </Map>
      </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o'
})(MapContainer)
