// Use of sort-by directly inspired by Udacity's React "Contacts App" lesson and example from the Front End Web Developer Nanodegree program, 2018.

import React, { Component } from 'react';
import LocationsDisplay from './LocationsDisplay'
import viewpoints from './data/viewpoints'
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

class App extends Component {
  state = {
    locations: []
  }
  
  componentDidMount() {
    console.log(viewpoints)
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
