// Use of sort-by directly inspired by Udacity's React "Contacts App" lesson and example from the Front End Web Developer Nanodegree program, 2018.

import React, { Component } from 'react';
import LocationsDisplay from './LocationsDisplay'
import sortBy from 'sort-by'

const mapStyles = {
  width: '100%',
  height: '100%'
}

const initialCenter = {
  // Reference point here is Coleman Dock, Downtown Seattle.
  lat: 47.602721,
  lng: -122.3411137
}

const zoom = 11

const viewpoints = [
  {name: 'Sam Smith Park', coordinates: {lat: 47.5903629, lng: -122.2974254}, website: 'https://www.seattle.gov/parks/find/parks/sam-smith-park'},
  {name: 'Louisa Boren Park', coordinates: {lat: 47.6350231, lng: -122.3129859}, website: 'https://www.seattle.gov/parks/find/parks/boren-park'},
  {name: 'Howell Park', coordinates: {lat: 47.6175199, lng: -122.2827664}, website: 'https://www.seattle.gov/parks/find/parks/howell-park'},
  {name: 'Me-Kwa-Mooks Park', coordinates: {lat: 47.5647362, lng: -122.4076485}, website: 'https://www.seattle.gov/parks/find/parks/me-kwa-mooks-park'},
  {name: 'Sunset Hill Park', coordinates: {lat: 47.6837634, lng: -122.4015805}, website: 'https://www.seattle.gov/parks/find/parks/sunset-hill-park'},
  {name: 'Kerry Park', coordinates: {lat: 47.629474, lng: -122.359473}, website: 'https://www.seattle.gov/parks/find/parks/kerry-park'},
  {name: 'Bhy Kracke Park', coordinates: {lat: 47.6304279, lng: -122.3494543}, website: 'https://www.seattle.gov/parks/find/parks/bhy-kracke-park'},
  {name: 'Jefferson Park', coordinates: {lat: 47.571434, lng: -122.311624}, website: 'https://www.seattle.gov/parks/find/parks/jefferson-park'},
  {name: 'Hamilton Viewpoint Park', coordinates: {lat: 47.5930187, lng: -122.3865962}, website: 'https://www.seattle.gov/parks/find/parks/hamilton-viewpoint-park'},
  {name: 'Dr. Jose P. Rizal Park', coordinates: {lat: 47.5927791, lng: -122.3183334}, website: 'https://www.seattle.gov/parks/find/parks/dr-jose-rizal-park'},
  {name: 'Ella Bailey Park', coordinates: {lat: 47.6408936, lng: -122.3934932}, website: 'https://www.seattle.gov/parks/find/parks/ella-bailey-park'}
]

class App extends Component {
  state = {
    locations: []
  }
  
  componentDidMount() {
    viewpoints.sort(sortBy('name'))
    this.setState({locations: viewpoints})
    if ('serviceworker' in navigator) { console.log('Client: service worker in navigator') }
  }

  /* Filter option methods; passed through LocationsDisplay down to ListView component.
    Reference point here is Cal Anderson Park, Capitol Hill, Seattle:
    lat: 47.6185989,
    lng: 47.6185989
  */
  showEastOfCal = () => {
    const locationsEastOfCal = viewpoints.filter(location => location.coordinates.lng > -122.3212956)
    const sortedLocactionsEastOfCal = locationsEastOfCal.sort(sortBy('name'))
    this.setState({locations: sortedLocactionsEastOfCal})
  }
  showSouthOfCal = () => {
    const locationsSouthOfCal = viewpoints.filter(location => location.coordinates.lat < 47.6185989)
    locationsSouthOfCal.sort()
    this.setState({locations: locationsSouthOfCal})
  }

  showWestOfCal = () => {
    const locationsWestOfCal = viewpoints.filter(location => location.coordinates.lng < -122.3212956)
    locationsWestOfCal.sort()
    this.setState({locations: locationsWestOfCal})
  }

  showNorthOfCal = () => {
    const locationsNorthOfCal = viewpoints.filter(location => location.coordinates.lat > 47.6185989)
    locationsNorthOfCal.sort()
    this.setState({locations: locationsNorthOfCal})
  }

  showAll = () => {
    this.setState({locations: viewpoints})
  }

  render() {
    return (
      <main>
        <div>
          <h1 tabIndex="0">Best Views Seattle Map</h1>
        </div>
        <div className="container">
          <LocationsDisplay
            locations={this.state.locations}
            mapStyles={mapStyles}
            initialCenter={initialCenter}
            zoom={zoom}
            // Props below through LocationsDisplay down to ListView component.
            onItemClick={this.onMarkerClick}
            showAll={this.showAll}
            showEastOfCal={this.showEastOfCal}
            showSouthOfCal={this.showSouthOfCal}
            showWestOfCal={this.showWestOfCal}
            showNorthOfCal={this.showNorthOfCal}
          />
        </div>
      </main>
    );
  }
}

export default App;
