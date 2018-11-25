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
  {name: 'Kerry Park', coordinates: {lat: 47.629474, lng: -122.359473}},
  {name: 'Bhy Kracke Park', coordinates: {lat: 47.6304279, lng: -122.3494543}},
  {name: 'Jefferson Park', coordinates: {lat: 47.571434, lng: -122.311624}},
  {name: 'Hamilton Viewpoint Park', coordinates: {lat: 47.5930187, lng: -122.3865962}},
  {name: 'Dr. Jose P. Rizal Bridge', coordinates: {lat: 47.5957121, lng: -122.3177041}},
  {name: 'Ella Bailey Park', coordinates: {lat: 47.6408936, lng: -122.3934932}}
]
// ListView Props

const buttonOneText = "Show All"

const buttonTwoText = "Show North of Cal Anderson"

class App extends Component {
  
  state = {
    markers: []
  }

  showNorthOfCal = () => {
    const markersNorthOfCal = this.state.markers.filter(marker => marker.coordinates.lat > 47.6173)
    this.setState({markers: markersNorthOfCal})
  }

  showAll = () => {
    console.log("See all views")
    this.setState({markers: markers})
  }

  componentDidMount() {
    this.setState({markers: markers})
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
            locations={viewpoints}
            mapStyles={mapStyles}
            initialCenter={initialCenter}
            markers={this.state.markers}
            zoom={zoom}
            // ListView props
            markers={this.state.markers}
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
