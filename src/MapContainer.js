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

export class MapContainer extends Component {

  mapObject = null 
 
  state = {
    // mapObject: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false,          
    // selectedPlace: null    
  };

  markersArray = []
  markerPropsArray = []
  

  onMapReady = (mapProps, map) => {
    this.mapObject = map
    this.updateMarkers(this.props.locations)
    console.log(this.props.locations)
    console.log("map is ready")
    // this.makeMarkers(this.props.markers)
    // this.setState({mapObject: map})
    
    // this.placeMarkers(this.state.mapObject)
    this.refs.listView.populateList()
  }

  updateMarkers = (locations) => {
    if (!locations) {
      console.log("no locations available")
      return
    }
    console.log("updating markers based on locations")
    
    this.state.markers.forEach(marker => marker.setMap(null))
    
    let markerPropsTemp = []
    let markersTemp = []
    
    locations.forEach((location, i) => {
      let theseMarkerProps = {
        name: location.name,
        key: i,
        index: i,
        position: location.coordinates,
        url: 'nonesuch'
      }
      markerPropsTemp.push(theseMarkerProps)

      let animation = null

      let thisMarker = new this.props.google.maps.Marker({
        position: location.coordinates,
        map: this.mapObject,
        animation: animation 
      })
      thisMarker.addListener('click', () => {
        this.onMarkerClick(theseMarkerProps, thisMarker, null)
      })
      markersTemp.push(thisMarker)

      return thisMarker
    })

  this.setState({markers: markersTemp, markerProps: markerPropsTemp})    

}

onMarkerClick = (props, marker, e) => {
  this.closeInfoWindow()
  console.log("On Marker Click Invoked")
  {this.setState({
    activeMarkerProps: props,
    activeMarker: marker,
    showingInfoWindow: true
    // selectedPlace: props,
  })}
}

closeInfoWindow = () => {
  if (this.state.activeMarker) {
    this.state.activeMarker.setAnimation(null)
    this.setState({
      activeMarker: null,
      activeMarkerProps: null,
      showingInfoWindow: false
    })
  }
}

  componentDidUpdate() {
    this.refs.listView.populateList()
  }

  storeMarkerInfo = (thisMarker) => {
    // this.markersArray = []
    // this.markerPropsArray = []
  // let markerProps = []
  // let markers = []
  // let theseProps = this.props.markers.map((marker, i) => {
  //   return {
  //     key: marker.name,
  //     index: i,
  //     name: marker.name,
  //     position: marker.coordinates
  //     }
  // })
  let theseProps = {
      key: thisMarker.props.name,
      index: '',
      name: thisMarker.props.name,
      position: thisMarker.props.position
  }
    // let markerCopy = new this.props.google.maps.Marker({
    //   position: marker.coordinates,
    //   map: this.mapObject
    // })
    console.log(thisMarker)
    // let markerCopy = Object.assign({}, thisMarker)
    let markerCopy = React.cloneElement(thisMarker)
    console.log(markerCopy)
    this.markersArray.push(markerCopy)
    // markers.push(thisMarker)
    this.markerPropsArray.push(theseProps)
    console.log(this.markersArray)
    console.log(this.markerPropsArray)
    // console.log(markers)
  // this.markerPropsArray = markerProps
  // this.markersArray = markers
  // console.log(this.markersArray)
}

  // // componentDidMount() {
  // //   this.refs.listView.populateList()
  // // }

  // componentDidUpdate() {
  //   if (this.markersArray) {
  //     this.makeMarkers(this.props.markers)
  //     this.placeMarkers(this.state.mapObject)
  //     this.refs.listView.populateList()
  //   }
  //   // this.refs.listView.populateList()
  // }

  // // https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
  // // https://developers.google.com/maps/documentation/javascript/markers
  // makeMarkers = (markersList) => {
  //   if (this.markersArray) {
  //      this.removeMarkers()
  //   }
  //   let markerProps = []
  //   let markers = []
  //   markersList.map((marker, i) => {
  //     let theseProps = {
  //       key: marker.name,
  //       index: i,
  //       name: marker.name,
  //       position: marker.coordinates
  //     }
  //     let thisMarker = new this.props.google.maps.Marker({
  //       position: marker.coordinates,
  //       // map: this.state.mapObject
  //     })
  //     console.log(thisMarker)
  //     console.log(theseProps)
  //     thisMarker.addListener('click', () => {
  //       this.onMarkerClick(theseProps, thisMarker)
  //       console.log("marker click")
  //       console.log(theseProps)
  //       console.log(thisMarker)
  //     })
  //     markerProps.push(theseProps)
  //     markers.push(thisMarker)
  //   })
  //   this.markerPropsArray = markerProps
  //   this.markersArray = markers
  //   console.log(this.markerPropsArray)
  //   console.log(this.markersArray)
  //   // if (this.refs.listView) {
  //   //   this.refs.listView.populateList()
  //   // }
  // }

  // // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
  // placeMarkers = (map) => {
  //   this.markersArray.forEach(marker => {
  //     marker.setMap(map)
  //   })
  //   console.log("markers set")
  //   // if (this.refs.listView) {
  //   //   this.refs.listView.populateList()
  //   //   console.log("list view populated")
  //   // } else {
  //   //   console.log("No ListView yet")
  //   // }
  // }

  // removeMarkers = () => this.placeMarkers(null)

  // onMarkerClick = (props, marker, e) => {
  //   console.log("On Marker Click Invoked")
  //   {this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   })};
      // let markerProps = []
      // let markers = []
      // this.props.markers.map((marker, i) => {
      //   let theseProps = {
      //     key: marker.name,
      //     index: i,
      //     name: marker.name,
      //     position: marker.coordinates
      //   }
      //   let thisMarker = new this.props.google.maps.Marker({
      //     position: marker.coordinates,
      //   })
      //   markerProps.push(theseProps)
      //   markers.push(thisMarker)
      // })
      // this.markerPropsArray = markerProps
      // this.markersArray = markers
  // }

  // onClose = props => {
  //   if (this.state.infoWindowDisplayed) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

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
        google={this.props.google}
        ref="listView"
        markers={this.props.markers}
        locations={this.props.locations}
        // associatedMarkerProps={this.markerPropsArray}
        // associatedMarkers={this.markersArray}
        associatedMarkers={this.state.markers}
        associatedMarkerProps={this.state.markerProps}
        onClickLI={this.onMarkerClick}
        onClose={this.onClose}
        buttonOneOnClick={this.props.buttonOneOnClick}
        buttonOneText={this.props.buttonOneText}
        buttonTwoOnClick={this.props.buttonTwoOnClick}
        buttonTwoText={this.props.buttonTwoText}
      >
      </ListView>
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
        {/* { this.markersArray = [],
          this.markerPropsArray = [],
          this.props.markers.map((marker, i) => {
            let thisMarker = (
              <Marker 
                onClick={this.onMarkerClick}
                name={marker.name}
                position={marker.coordinates}
              />
            )
            this.storeMarkerInfo(thisMarker)
            return thisMarker
          })}
          {console.log(this.markersArray)}

            {/* return(
              <Marker 
                onClick={this.onMarkerClick}
                name={marker.name}
                position={marker.coordinates}
              />
            )
          })} */}
        <InfoWindow
          // buttonOneOnClick={this.props.buttonOneOnClick}
          // buttonOneText={this.props.buttonOneText}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}
        >
          <div>
            {/* <h4>{this.state.selectedPlace.name}</h4> */}
            <h4>{this.state.activeMarkerProps && this.state.activeMarkerProps.name}</h4>
            <a href={this.state.associatedMarkerProps && this.state.activeMarkerProps.url}>URL</a>
          </div>
          
        </InfoWindow>
        {/* {this.makeMarkers(this.props.markers)} */}
        {/* <Marker /> */}
      </Map>
      </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o'
})(MapContainer)
