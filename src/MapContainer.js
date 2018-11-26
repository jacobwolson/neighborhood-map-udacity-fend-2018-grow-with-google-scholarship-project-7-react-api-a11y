// Walkthrough consulted: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be

/* Consulted sources, general: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
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

const FOURSQUARE_CLIENT_ID = "WBRJ0OIHLBSA0BEJ0WYUGV2EYMNV5DN25SNEGYBVCM0LPR0M"
const FOURSQUARE_CLIENT_SECRET = "44CDSMTT0QOYYOHLTJHZOOP5OL5XDC2JZIUFWJFNSHXI0DGH"
const FOURSQUARE_VERSION = "20181125"


export class MapContainer extends Component {

  mapObject = null 
 
  state = {
    // mapObject: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false,          
  };

  markersArray = []
  markerPropsArray = []
  
  onMapReady = (mapProps, map) => {
    console.log("Map ready!")
    this.mapObject = map
    this.updateMarkers(this.props.locations)
    this.refs.listView.populateList()
  }

  componentDidUpdate() {
    this.updateMarkers(this.props.locations)
    this.refs.listView.populateList()
  }

  updateMarkers = (locations) => {
    console.log("Updating markers")
    if (!locations) {
      console.log("no locations available")
      return
    }
    
    
    let markerPropsTemp = []
    let markersTemp = []
    
    locations.forEach((location, i) => {
      let theseMarkerProps = {
        name: location.name,
        key: i,
        index: i,
        position: location.coordinates,
        url: location.url
      }
      markerPropsTemp.push(theseMarkerProps)
    });

    // let testArray = []
    // if (this.state.markerProps.filter(markerProp => markerProp.name).length !== 0) {
    //   testArray = this.state.markerProps.filter((markerProp, i) => markerProp.name === markerPropsTemp[i].name)
    // }
    if (this.state.markerProps.length !== markerPropsTemp.length) {
      this.state.markers.forEach(marker => marker.setMap(null))
      locations.forEach((location, i) => {
      let animation = 4
      let thisMarker = new this.props.google.maps.Marker({
        position: location.coordinates,
        map: this.mapObject,
        animation: animation,
        url: location.url
      })
      thisMarker.addListener('click', () => {
        this.onMarkerClick(markerPropsTemp[i], thisMarker, null)
      })
      console.log(thisMarker)
      markersTemp.push(thisMarker)

      return thisMarker
      })
      this.setState({markers: markersTemp, markerProps: markerPropsTemp}) 
    }
}

// Code from: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
getVenues = (props, data) => {
  return data
        .response
        .venues
        .filter(item => item.name.includes(props.name) || props.name.includes(item.name))
}

onMarkerClick = (props, marker, e) => {
  console.log("On Marker Click Invoked")
  this.closeInfoWindow()

  // Fetch info from Foursquare

  // https://stackoverflow.com/a/17864016
  // https://developer.foursquare.com/docs/api/configuration/versioning
  let fsUrl = `https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=${FOURSQUARE_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=200`
              
  let headers = new Headers()
  let request = new Request(fsUrl, {
    method: 'GET',
    headers
  })

  // Code from: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
  let activeMarkerProps
  fetch(request)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let venue = this.getVenues(props, result)[0]
      activeMarkerProps = {
        // props that were passed in to funciton
        ...props,
        // foursquare data for venue
        foursquare: venue
      }
      console.log(activeMarkerProps)
      
      if (activeMarkerProps.foursquare) {
        let imageUrl = `https://api.foursquare.com/v2/venues/${venue.id}/photos?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=${FOURSQUARE_VERSION}`
        fetch(imageUrl).then(response => response.json()).then(result => {
          activeMarkerProps = {
            ...activeMarkerProps,
            images: result.response.photos
          }
          if (this.state.activeMarker)
            this.state.activeMarker.setAnimation(null)
            // marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
            // thanks to: https://stackoverflow.com/a/36396843
            marker.setAnimation(4)
            {this.setState({
              activeMarkerProps,
              activeMarker: marker,
              showingInfoWindow: true
              // selectedPlace: props,
            })}
        })
      } else {
          // marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
          marker.setAnimation(4)
          {this.setState({
            activeMarkerProps,
            activeMarker: marker,
            showingInfoWindow: true
          })}
      }
    })
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

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  filterLocations() {
    console.log("Filtering locations!")
  }

  render() {
    {console.log("render mapContainer")}
    {console.log(this.props.locations)}
    return (
      <div className="container">
      <div>
      <ListView
        google={this.props.google}
        ref="listView"
        locations={this.props.locations}
        let markersList={this.state.markers}
        let markerPropsList={this.state.markerProps}
        onClickLI={this.onMarkerClick}
        onClose={this.onClose}
        buttonOneOnClick={this.props.buttonOneOnClick}
        buttonOneText={this.props.buttonOneText}
        buttonTwoOnClick={this.props.buttonTwoOnClick}
        buttonTwoText={this.props.buttonTwoText}
        For SelectMenu component
        filterLocations={this.filterLocations}
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
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}
        >
          <div>
            <h4>{this.state.activeMarkerProps && this.state.activeMarkerProps.name}</h4>
            {this.state.activeMarkerProps && (
              <img src={this.state.activeMarkerProps.images && this.state.activeMarkerProps.images.items[0].prefix + "100x100" + this.state.activeMarkerProps.images.items[0].suffix}/>
              )
            }
            <div>
              <a href={this.state.activeMarkerProps && this.state.activeMarkerProps.url}>Website</a>
            </div>
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
