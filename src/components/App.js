// React version = 16.6.3

/* General sources consulted for creating an SPA that incoroporates the Google Maps API using
using React and with `google-maps-react`, which directly or indirectly influeced the content, 
architecture and logic of my code throughout, include in particular:

- Rachel Njeri's article "React Apps with the Google Maps API and google-maps-react" found here: 
https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react;
- Ari Lerner's aricle "How to Write a Google Maps React Component," which also acts as 
an introduction to google-maps-react, found here:
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
- Udacity Project Coach Doug Brown's Walkthrough for this project, found here:
 https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be.

 Additional, particular, sources are noted throughout the code, adjescent to relevant lines
 or blocks where possible, or at the top of files in which they were used as general references.

 Udacity's 2018 Front End Web Devlopmer program, as funded by the Grow with Google scholarship, helped me 
 gain much the knowledge and skills I needed to create this project, along with indispensible support, 
 encouragment and insight from fellow students and the wider programming community.

 MDN, reactjs.com and W3Schools were accessed for general reference througout the course of the project.

 StackOverflow answers that directly impacted my code are noted throughout, in addition to the afformentioned.
 */

import React, { Component } from 'react';
import LocationsDisplay from './LocationsDisplay'
import viewpoints from '../data/viewpoints'
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
    // Use of sort-by directly inspired by Udacity's React "Contacts App" lesson and example from the Front End Web Developer Nanodegree program, 2018.
    viewpoints.sort(sortBy('name'))
    this.setState({locations: viewpoints})
    if ('serviceworker' in navigator) { console.log('Client: service worker in navigator')
    }
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
        <div role="banner">
          <h1 tabIndex="0">Best Views Seattle Map</h1>
        </div>
        <div role="presentation" className="container locations-display-container">
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
