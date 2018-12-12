/* Project coach Doug Brown's walkthrough was consulted in the course of completing this project, and had 
  particular influence on on this component: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be,
*/

/* Other sources consulted for incorporating a Google map with dynamic markers in a React app using google-maps-react:
  article by Rachel Njeri: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
  article by Ari Lerner: https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
*/

// Consulted for dynamically adding markers: https://stackoverflow.com/a/43938322.

/* Also consulted as general resources for creating this app:
https://stackoverflow.com/a/47563854
https://reactjs.org/docs/lifting-state-up.html#lifting-state-up
https://reactjs.org/docs/components-and-props.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
*/

// Additional sources pertinent to particular items are referenced above lines or blocks of relevant code throughout the document.

import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
// Consulted for importing and using single module from lodash: https://stackoverflow.com/a/43479515
import isEqual from 'lodash.isequal'
import ListView from './ListView'
import NoMap from './NoMap'
import mapStyles from '../styles/mapStyles'

const GOOGLE_MAPS_API_KEY = "AIzaSyBvmvRFjknv-wc3F8y_SZc1WTy_rLRfW3o"
const FLICKR_API_KEY = "2b6766fb0960cc8091819b49e304df4b"

export class LocationsDisplay extends Component {
 
  state = {
    noMapError: true,
    mapObject: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false         
  };

  markersArray = []
  markerPropsArray = []
  
  onMapReady = (mapProps, map) => {
    this.setState({mapObject: map})
    this.updateMarkers(this.props.locations)
  }

  componentDidUpdate() {
    this.updateMarkers(this.props.locations)
  }

  /* Particular credit to Doug Brown here for helping inspire this method, including the technique
  of creating marker props and maker object to store in state for later use. */
  updateMarkers = (locations) => {
    let markerPropsTemp = []
    let markersTemp = []
    
    // Create and store an object containing the props for each location's marker
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
    // let arraysMatch = this.arraysMatch(this.state.markerProps, markerPropsTemp)
    let arraysMatch = isEqual(this.state.markerProps, markerPropsTemp)

    /* This `if` statement acts as a guard: if the current marker info saved in this component's state,
       as checked via `markerProps`, is an exact match for the current "locations" data, then do 
       not proceed with creating new markers and updating state. This guard avoids a `setState()`-induced
       feedback loop. */
    if (!arraysMatch) {
      this.state.markers.forEach(marker => marker.setMap(null))
      locations.forEach((location, i) => {
      let thisMarker = new this.props.google.maps.Marker({
        position: location.coordinates,
        map: this.state.mapObject,
        animation: 4,
        url: location.url
      })
      thisMarker.tabIndex = 0
      thisMarker.addListener('click', () => {
        this.onMarkerClick(markerPropsTemp[i], thisMarker, null)
      })
      markersTemp.push(thisMarker)
      })
      this.setState({markers: markersTemp, markerProps: markerPropsTemp}) 
    }
  }

  // Consulted for this function, general: http://kylerush.net/blog/flickr-api/
  /* Paticular credit to Doug Brown in his walkthrough here as well for helping inspire the 
   * technique used to retrieve an image from an API using a FETCH request.
  */
  requestFlickrImage = (props, marker) => {
    let altText
    let firstImage
    let firstImageSrc
    let firstImageOwnerPage
    let clickedMarkerProps = {
      name: props.name,
      key: props.key,
      index: props.index,
      position: props.position,
      website: props.website
    }
    const ifNoImage = () => {
      this.setState({
        activeMarkerProps: clickedMarkerProps,
        activeMarker: marker,
        flikrImage: null,
        showingInfoWindow: true
      })
    }
    /* Consulted for using `.bind()` method: 
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    */
    const boundIfNoImage = ifNoImage.bind(LocationsDisplay)
    /* Source for technique of setting `&nojsoncallback=1` argument: 
    * https://teamtreehouse.com/community/how-do-i-get-flickr-to-respond-json-that-i-can-use
    */
    // Source for photos.search API method: https://www.flickr.com/services/api/flickr.photos.search.html
    const restRequest = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${props.name}&format=json&nojsoncallback=1&sort=interestingness-desc&lat=${props.position.lat}&lon=${props.position.lng}&radius=0.3`;
    fetch(restRequest).then(response => response.json()).then(parsedResponse => {
      if (parsedResponse) {
        firstImage = parsedResponse.photos.photo[0]
      } 
      if (firstImage) {
        // Source: https://www.flickr.com/services/api/misc.urls.html
        firstImageSrc = `https://farm${firstImage.farm}.staticflickr.com/${firstImage.server}/${firstImage.id}_${firstImage.secret}_m.jpg`
      } 
      if (firstImageSrc) {
      firstImageOwnerPage = `https://www.flickr.com/photos/${firstImage.owner}/`
      altText = `Image associated with ${props.name}, fetched from Flickr. Posted by: ${firstImageOwnerPage}`
      }
      // Consulted for use of spread operator: https://dmitripavlutin.com/object-rest-spread-properties-javascript/
      clickedMarkerProps = {
        ...clickedMarkerProps,
        altText,
        flikrImage: firstImageSrc,
        firstImageOwnerPage
      }
      this.setState({
        activeMarkerProps: clickedMarkerProps,
        activeMarker: marker,
        flikrImage: firstImageSrc,
        showingInfoWindow: true
      })
    })
    // Consulted for catching error: https://stackoverflow.com/a/51785817
    /* If there is a failure attempting to retrieve an image, an alert will display, then
    * the marker's info window will display with a message in lieu of an image and 
    * concomitant information. See `.render()` below for details.
    */
    .catch(function(err) {
      alert("Unable to fetch any images from Flickr for this location at the moment.")
      boundIfNoImage()
    })
  }

  onMarkerClick = (props, marker, e) => {
    // Source for `setAnimation` to bounce technique: https://stackoverflow.com/a/36396843.
    marker.setAnimation(4)
    this.requestFlickrImage(props, marker)
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
      <div className="container main-content-container">
        <div className="container list-view-container">
          <ListView
            google={this.props.google}
            locations={this.props.locations}
            markersList={this.state.markers}
            markerPropsProp={this.state.markerProps}
            onClickLI={this.onMarkerClick}
            onClose={this.onClose}
            // Prop below passed through ListView down to SelectMenu component.
            filterLocations={this.filterLocations}
          />
        </div>
        <div className="container map-view-container">
          <Map 
            // Consulted for setting `role` and `aria-role` for map: https://stackoverflow.com/a/49015889.
            role="application"
            aria-label="Map with markers at locations of interest."
            google={this.props.google}
            onReady={this.onMapReady}
            onClick={this.onMapClicked}
            /* Styles created at https://mapstyle.withgoogle.com/ as suggested by a Udacity reviewer
            * giving feedback on the first itteration of this projecdt.
            */
            styles={mapStyles}
            zoom={this.props.zoom}
            initialCenter={this.props.initialCenter}
            mapTypeID="sattelite"
          >
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.closeInfoWindow}
            >
            {this.state.activeMarkerProps ? (
              <div className="container infowindow-container">
                <h2>{this.state.activeMarkerProps.name}</h2>
                {this.state.activeMarkerProps.flikrImage ? (
                  <div className="has-image-display" role="presentation"> 
                    <img 
                      title={this.state.activeMarkerProps.name}
                      alt={this.state.activeMarkerProps.altText}
                      src={this.state.activeMarkerProps && this.state.activeMarkerProps.flikrImage}/>
                      <br></br>
                      <p className="info-window-main-text">
                        Image fetched from <a href="https:www.flickr.com">Flickr</a>; posted by 
                        <a href={this.state.activeMarkerProps.firstImageOwnerPage}> this photographer.</a>
                      </p>
                  </div>
                  ) : (
                  <div className="no-image-display" role="presentation">
                    <p className="info-window-main-text">
                      No image matching our query for this location available at the moment.<br></br><br></br>
                      ... get out there and take one? <br></br><br></br> ¯\_(ツ)_/¯📷🌆🏞️
                    </p>
                  </div>
                  )}
                  <p className="info-window-main-text">
                    As just one source of information about this place, you can check out 
                    <a href={this.state.activeMarkerProps && this.state.activeMarkerProps.website}> Seattle 
                    Park's and Recreation's page </a>about the site.
                  </p>
              </div>
              ) : <p>Unfortunately, we don't have any additional information about this location available at the moment.<br></br> 
                If you are looking to learn more about this place, don't hesitate to send us a line. And check back soon!</p>
            }
            </InfoWindow>
          </Map>
          ) 
        </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({apiKey: GOOGLE_MAPS_API_KEY, LoadingContainer: NoMap})(LocationsDisplay)
