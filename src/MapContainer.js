/* Cnosulted/sources, general: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
    https://github.com/fullstackreact/google-maps-react/blob/master/README.md
*/
// Consulted for dynamically adding markers: https://stackoverflow.com/a/43938322

import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ListView from './ListView'


// ListView Props

const buttonOneText = "Show All"

const buttonTwoText = "Show North of Cal Anderson"

export class MapContainer extends Component {
 
  state = {
    showingInfoWindow: false, 
    activeMarker: {},          
    selectedPlace: {},     
  };

  onMarkerClick = (props, marker, e) => 
    {console.log(props);
      console.log(marker);
    this.setState({
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
        onItemClick={this.onMarkerClick}
        buttonOneOnClick={this.showAll}
        buttonOneText={buttonOneText}
        buttonTwoOnClick={this.showNorthOfCal}
        buttonTwoText= {buttonTwoText}
      />
      </div>
      <Map 
        google={this.props.google}
        onClick={this.onMapClicked}
        style={this.props.mapStyles} 
        zoom={this.props.zoom}
        initialCenter={this.props.initialCenter}
      >
        {this.props.markers.map((marker, i) => {
          return(
            <Marker 
              onClick={this.onMarkerClick}
              name={marker.name}
              position={marker.coordinates}
            />
          )
        })}

        <InfoWindow
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
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o'
})(MapContainer)
