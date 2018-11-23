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
    // markers: null,
    // markerProps: null,
    mapObject: null,
    showingInfoWindow: false, 
    activeMarker: {},          
    selectedPlace: {},     
  };

  markersArray = []
  markerPropsArray = []

  onMapReady = (mapProps, map) => {
    console.log("map is ready")
    this.setState({mapObject: map})
    // this.makeMarkers(this.props.markers)
    this.placeMarkers(this.state.mapObject);
  }

  componentDidUpdate() {
    if (this.markersArray) {
      this.placeMarkers(this.state.mapObject)
    }
  }

  // https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
  // https://developers.google.com/maps/documentation/javascript/markers
  makeMarkers = (markersList) => {
    if (this.markersArray) {
       this.removeMarkers()
    }
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
        console.log("marker" + i + "clicked")
        console.log(theseProps)
        console.log(thisMarker)
        // this.onMarkerClick(theseProps, thisMarker)
        this.onMarkerClick(theseProps, thisMarker)
      })
      markerProps.push(theseProps)
      markers.push(thisMarker)
      // return thisMarker
    })
    // this.setState({
    //   markers: markers,
    //   markerProps: markerProps,
    // })
    this.markerPropsArray = markerProps
    this.markersArray = markers
    console.log(this.markerPropsArray)
    console.log(this.markersArray)
  }

  // makeMarkers = (markersList) => {
  //   let markerProps = []
  //   let markers = []
 
  //   markersList.map((marker, i) => {
  //     console.log("making markers")
  //     let theseProps = {
  //       key: marker.name,
  //       index: i,
  //       name: marker.name,
  //       position: marker.coordinates
  //     }
  //     let thisMarker = new this.props.google.maps.Marker({
  //       position: marker.coordinates,
  //       map: this.state.mapObject
  //     })
  //     thisMarker.addListener('click', () => {
  //       this.onMarkerClick(theseProps, thisMarker)
  //     })
  //     markerProps.push(theseProps)
  //     markers.push(thisMarker)
     
  //     return thisMarker
  //   })
  //   this.setState({
  //     markers: markers,
  //     markerProps: markerProps,
  //   })
  // }


  // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
  placeMarkers = (map) => {
    this.markersArray.forEach(marker => {
      marker.setMap(map)
    })
  }

  removeMarkers = () => this.placeMarkers(null)

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
    console.log("render map container")
    return (
      <div className="container">
      <div>
      <ListView
        markers={this.props.markers}
        associatedMarkerProps={this.markerPropsArray}
        associatedMarkers={this.markersArray}
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
        {this.makeMarkers(this.props.markers)}
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
