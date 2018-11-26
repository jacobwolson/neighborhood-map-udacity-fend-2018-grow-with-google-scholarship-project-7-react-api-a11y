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
    locations: []
  }

  showNorthOfCal = () => {
    const markersNorthOfCal = this.state.locations.filter(location => location.coordinates.lat > 47.6173)
    console.log("show north of cal")
    this.setState({locations: markersNorthOfCal})
    console.log("North of Cal")
    console.log(this.state.locations)
    console.log(markersNorthOfCal)
  }

  showAll = () => {
    console.log("See all views")
    this.setState({locations: viewpoints})
  }

  componentDidMount() {
    this.setState({locations: viewpoints})
  }

  componentDidUpdate() {
    {this.refs.mapContainer && console.log("Update App Component")}
  }

  render() {
    {console.log("render app component")}
    return (
      <div>
        {/* <NavBar/> */}
        <div>
          <h1>Best Views Seattle Map</h1>
        </div>

        <div className="container">

          <MapContainer
            ref="mapContainer"
            locations={this.state.locations}
            mapStyles={mapStyles}
            initialCenter={initialCenter}
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
