import React, { Component } from 'react';
import MapContainer from './MapContainer'

const mapStyles = {
  width: '100%',
  height: '100%'
}

const initialCenter = {
  // Coordinates for Coleman Dock
  lat: 47.602721,
  lng: -122.3411137
}

const zoom = 11

const buttonOneText = "Show All"

const buttonTwoText = "Show North of Cal Anderson"

const viewpoints = [
  {name: 'Kerry Park', coordinates: {lat: 47.629474, lng: -122.359473}, url: 'https://www.seattle.gov/parks/find/parks/kerry-park'},
  {name: 'Bhy Kracke Park', coordinates: {lat: 47.6304279, lng: -122.3494543}, url: 'https://www.seattle.gov/parks/find/parks/bhy-kracke-park'},
  {name: 'Jefferson Park', coordinates: {lat: 47.571434, lng: -122.311624}, url: 'https://www.seattle.gov/parks/find/parks/jefferson-park'},
  {name: 'Hamilton Viewpoint Park', coordinates: {lat: 47.5930187, lng: -122.3865962}, url: 'https://www.seattle.gov/parks/find/parks/hamilton-viewpoint-park'},
  {name: 'Dr. Jose P. Rizal Park', coordinates: {lat: 47.5927791, lng: -122.3183334}, url: 'https://www.seattle.gov/parks/find/parks/dr-jose-rizal-park'},
  {name: 'Ella Bailey Park', coordinates: {lat: 47.6408936, lng: -122.3934932}, url: 'https://www.seattle.gov/parks/find/parks/ella-bailey-park'}
]

class App extends Component {
  
  state = {
    locations: []
  }

  
  componentDidMount() {
    this.setState({locations: viewpoints})
  }

  // Filter option methods
    /* Reference Point: Cal Anderson Park, Capitol Hill, Seattle
      lat: 47.6185989,
      lng: 47.6185989
    */
  showSouthOfCal = () => {
    const locationsSouthOfCal = viewpoints.filter(location => location.coordinates.lat < 47.6185989)
    this.setState({locations: locationsSouthOfCal})
  }

  showWestOfCal = () => {
    const locationsWestOfCal = viewpoints.filter(location => location.coordinates.lng < -122.3212956)
    this.setState({locations: locationsWestOfCal})
  }

  showNorthOfCal = () => {
    const locationsNorthOfCal = viewpoints.filter(location => location.coordinates.lat > 47.6185989)
    this.setState({locations: locationsNorthOfCal})
  }

  showAll = () => {
    this.setState({locations: viewpoints})
  }


  render() {
    return (
      <div>
        <div>
          <h1>Best Views Seattle Map</h1>
        </div>
        <div className="container">
          <MapContainer
            locations={this.state.locations}
            mapStyles={mapStyles}
            initialCenter={initialCenter}
            zoom={zoom}
            // ListView-specific props
            onItemClick={this.onMarkerClick}
            showAll={this.showAll}
            showSouthOfCal={this.showSouthOfCal}
            showWestOfCal={this.showWestOfCal}
            showNorthOfCal={this.showNorthOfCal}
          />
        </div>
      </div>
    );
  }
}

export default App;
