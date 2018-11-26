import React, { Component } from 'react';
import MapContainer from './MapContainer'
import ListView from './ListView'
import NavBar from './NavBar'
import logo from './logo.svg';
import { Marker } from 'react-google-maps';


// MapContainer Props 

const mapStyles = {
  width: '100%',
  height: '100%'
}

const initialCenter = {
  lat: 47.619947, 
  lng: -122.312797
}

const zoom = 12

const markers = [
  {name: 'Kerry Park', coordinates: {lat: 47.629474, lng: -122.359473}},
  {name: 'Bhy Kracke Park', coordinates: {lat: 47.6304279, lng: -122.3494543}},
  {name: 'Jefferson Park', coordinates: {lat: 47.571434, lng: -122.311624}},
  {name: 'Hamilton Viewpoint Park', coordinates: {lat: 47.5930187, lng: -122.3865962}},
  {name: 'Dr. Jose P. Rizal Bridge', coordinates: {lat: 47.5957121, lng: -122.3177041}},
  {name: 'Ella Bailey Park', coordinates: {lat: 47.6408936, lng: -122.3934932}}
]

const viewpoints = [
  {name: 'Kerry Park', coordinates: {lat: 47.629474, lng: -122.359473}, url: 'https://www.seattle.gov/parks/find/parks/kerry-park'},
  {name: 'Bhy Kracke Park', coordinates: {lat: 47.6304279, lng: -122.3494543}, url: 'https://www.seattle.gov/parks/find/parks/bhy-kracke-park'},
  {name: 'Jefferson Park', coordinates: {lat: 47.571434, lng: -122.311624}, url: 'https://www.seattle.gov/parks/find/parks/jefferson-park'},
  {name: 'Hamilton Viewpoint Park', coordinates: {lat: 47.5930187, lng: -122.3865962}, url: 'https://www.seattle.gov/parks/find/parks/hamilton-viewpoint-park'},
  {name: 'Dr. Jose P. Rizal Park', coordinates: {lat: 47.5927791, lng: -122.3183334}, url: 'https://www.seattle.gov/parks/find/parks/dr-jose-rizal-park'},
  {name: 'Ella Bailey Park', coordinates: {lat: 47.6408936, lng: -122.3934932}, url: 'https://www.seattle.gov/parks/find/parks/ella-bailey-park'}
]
// ListView Props

const buttonOneText = "Show All"

const buttonTwoText = "Show North of Cal Anderson"

class App extends Component {
  
  state = {
    markers: [],
    locations: []
  }

  showNorthOfCal = () => {
    const markersNorthOfCal = this.state.locations.filter(location => location.coordinates.lat > 47.6173)
    console.log("show north of cal")
    this.setState({locations: markersNorthOfCal})
  }

  showAll = () => {
    console.log("See all views")
    this.setState({locations: viewpoints})
  }

  componentDidMount() {
    this.setState({markers: markers})
    this.setState({locations: viewpoints})
  }

  render() {
    return (
      <div>
        {/* <NavBar/> */}
        <div>
          <h1>Best Views Seattle Map</h1>
        </div>

        <div className="container">

          <MapContainer
            locations={this.state.locations}
            mapStyles={mapStyles}
            initialCenter={initialCenter}
            // markers={this.state.markers}
            zoom={zoom}
            // ListView-specific props
            onItemClick={this.onMarkerClick}
            buttonOneOnClick={this.showAll}
            buttonOneText={buttonOneText}
            buttonTwoOnClick={this.showNorthOfCal}
            buttonTwoText= {buttonTwoText}
          />

        </div>

      </div>

    );
  }
}

export default App;
