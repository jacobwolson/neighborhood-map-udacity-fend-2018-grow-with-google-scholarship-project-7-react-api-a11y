// Walkthrough consulted: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be

/* Sources consulted for incorporating a Google map with dynamic markers in a React app using google-maps-react, general: 
  https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
  https://github.com/fullstackreact/google-maps-react/blob/master/README.md
*/

// Consulted for dynamically adding markers: https://stackoverflow.com/a/43938322

/* Also consulted: 
https://stackoverflow.com/a/53322289
https://stackoverflow.com/a/47563854
https://reactjs.org/docs/lifting-state-up.html#lifting-state-up
https://reactjs.org/docs/components-and-props.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
*/

import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
import ListView from './ListView'

const FLICKR_API_KEY = "2b6766fb0960cc8091819b49e304df4b"

export class LocationsDisplay extends Component {

  mapObject = null 
 
  state = {
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false         
  };

  markersArray = []
  markerPropsArray = []
  
  onMapReady = (mapProps, map) => {
    this.mapObject = map
    this.updateMarkers(this.props.locations)
    this.refs.listView.populateList()
  }

  componentDidUpdate() {
    this.updateMarkers(this.props.locations)
    this.refs.listView.populateList()
  }

  // Modified from https://stackoverflow.com/a/16436975 to accomodate for arrays containing objects.
  // Also consulted: https://stackoverflow.com/a/14853974
  // https://www.flickr.com/services/api/response.rest.html
  // https://www.flickr.com/services/api/flickr.galleries.getPhotos.html
  // https://www.flickr.com/services/api/misc.urls.html
  // http://code.flickr.net/2008/08/19/standard-photos-response-apis-for-civilized-age/

  arraysMatch(array1, array2) {
    if (array1 == null || array2 == null) return null
    if (array1.length !== array2.length) return null
    let i = 0
    let testArray = []
    array1.forEach(item => {
        if (item.name === array2[i].name) {
          testArray.push("match")
        }
        i++
      }
    )
    if (testArray.length === array2.length) {
      return true 
    } else {
      return null
    }
  }

  /* Particular credit to Doug Brown here for helping inspire this method, including the technique
  of creating marker props and maker object to store in state for later use. */
  updateMarkers = (locations) => {
    let markerPropsTemp = []
    let markersTemp = []
    
    // Create and store an object containing the 
    locations.forEach((location, i) => {
      let theseMarkerProps = {
        name: location.name,
        key: i,
        index: i,
        position: location.coordinates,
        website: location.website
      }
      markerPropsTemp.push(theseMarkerProps)
    });

    // Variable for guard, below
    let arraysMatch = this.arraysMatch(this.state.markerProps, markerPropsTemp)

    /* This `if` statement acts as a guard: if the current marker info saved in this component's state,
       as checked via `markerProps`, is an exact match for the current "locations" data, then do 
       not proceed with creating new markers and updating state. This guard avoids a `setState()`-induced
       feedback loop. */
    if (!arraysMatch) {
      this.state.markers.forEach(marker => marker.setMap(null))
      locations.forEach((location, i) => {
      let thisMarker = new this.props.google.maps.Marker({
        position: location.coordinates,
        map: this.mapObject,
        animation: 4,
        url: location.url
      })
      thisMarker.addListener('click', () => {
        this.onMarkerClick(markerPropsTemp[i], thisMarker, null)
      })
      console.log(thisMarker)
      markersTemp.push(thisMarker)
      console.log(markersTemp)
      })
      this.setState({markers: markersTemp, markerProps: markerPropsTemp}) 
    }
    
}

// Consulted: http://kylerush.net/blog/flickr-api/
// Consulted: https://teamtreehouse.com/community/how-do-i-get-flickr-to-respond-json-that-i-can-use
/* Paticular credit to Doug Brown here as well for helping inspire this method used to retrieve an
  image from an API using a FETCH request. */
getFlickrImage = (props, marker) => {
  console.log("getting flikr image")
  let firstImage
  let firstImageSrc
  let firstImageOwnerPage
  let clickedMarkerProps
  let restRequest = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${props.name}&format=json&nojsoncallback=1&sort=interestingness-desc&lat=${props.position.lat}&lon=${props.position.lng}&radius=0.3`;
  fetch(restRequest)
  .then(response => response.json())
  .then(parsedResponse => {
    if (parsedResponse) {
      firstImage = parsedResponse.photos.photo[0]
    } 
    if (firstImage) {
      firstImageSrc = `https://farm${firstImage.farm}.staticflickr.com/${firstImage.server}/${firstImage.id}_${firstImage.secret}_m.jpg`
    } 
    if (firstImageSrc) {
    firstImageOwnerPage = `https://www.flickr.com/photos/${firstImage.owner}/`
    }

    clickedMarkerProps = {
      name: props.name,
      key: props.key,
      index: props.index,
      position: props.position,
      website: props.website,
      flikrImage: firstImageSrc,
      firstImageOwnerPage: firstImageOwnerPage
    }
  
    this.setState({
      activeMarkerProps: clickedMarkerProps,
      activeMarker: marker,
      flikrImage: firstImageSrc,
      showingInfoWindow: true
    })
  })
}

onMarkerClick = (props, marker, e) => {
  // Source: https://stackoverflow.com/a/36396843
  console.log(props)
  console.log(marker)
  marker.setAnimation(4)
  this.getFlickrImage(props, marker)
  this.closeInfoWindow()

}
      
closeInfoWindow = () => {
    this.setState({
      activeMarker: null,
      activeMarkerProps: null,
      showingInfoWindow: false
    })
}

  onMapClicked = () => {
    this.closeInfoWindow()
  }

  filterLocations = (selectedOption) => {
    selectedOption === 'anywhere' ? this.props.showAll()
    : selectedOption === 'eastOfCal' ? this.props.showEastOfCal()
    : selectedOption === 'southOfCal' ? this.props.showSouthOfCal()
    : selectedOption === 'westOfCal' ? this.props.showWestOfCal()
    : selectedOption === 'northOfCal' && this.props.showNorthOfCal()
  }

  render() {
    return (
      <div className="container map-component-container">
        <div className="container list-view-container">
          {/* <OldListView */}
          <ListView
            google={this.props.google}
            ref="listView"
            // ref="oldListView"
            locations={this.props.locations}
            let markersList={this.state.markers}
            let markerPropsProp={this.state.markerProps}
            onClickLI={this.onMarkerClick}
            onClose={this.onClose}
            // Prop below passed through ListView down to SelectMenu component
            filterLocations={this.filterLocations}
          />
        </div>
        <div className="container map-view-container">
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
            {this.state.activeMarkerProps ? (
              <div className="container infowindow-container">
                <h2>{this.state.activeMarkerProps.name}</h2>
                <img src={this.state.activeMarkerProps && this.state.activeMarkerProps.flikrImage}/>
                <br></br>
                <p className="infowindow-main-text">
                  {this.state.activeMarkerProps.flikrImage ? (
                    <p>
                      Image fetched from <a href="https:www.flickr.com">Flickr</a>; posted by 
                      <a href={this.state.activeMarkerProps.firstImageOwnerPage}> this photographer.</a>
                    </p>) 
                    : <p>"No image matching our query available at this moment."</p>
                  }
                  <p>
                    As just one source of information about this place, you can check out 
                    <a href={this.state.activeMarkerProps && this.state.activeMarkerProps.website}> Seattle 
                    Park's and Recreation's page </a>about the site.
                  </p>
                </p>
              </div>
              ) : <p>"Unfortunately, we don't have any additional information about this location available at the moment. 
                If you are looking to learn more about this place, don't hesitate to send us a line. And check back soon!"</p>
            }
            </InfoWindow>
          </Map>
      </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o'
})(LocationsDisplay)
