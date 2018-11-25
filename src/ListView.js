import React, { Component } from 'react'

class ListView extends Component {
    
    markerPropsArray = []
    markersArray = []
    // state = {
    //     markers: null
    // }

    // showInfoWindowFromList = (prop, marker) => {
    //     this.props.onClickLI(prop, marker)
    // }

    // Consulted for creating and adding new LI: https://www.w3schools.com/jsref/met_node_appendchild.asp
    // Code for clearing list: https://stackoverflow.com/a/27324794
    populateList = () => {
        console.log("populating list")
        const listViewList = document.getElementById('list-view-list')
        listViewList.innerHTML = ''
        // let associatedMarkers = this.props.associatedMarkers
        // let associatedMarkerProps = this.props.associatedMarkerProps
        let clickLI = this.props.onClickLI
        let i = 0
        

    //     let markerProps = []
    //   let markers = []
    //   this.props.markers.map((marker, i) => {
    //     let theseProps = {
    //       key: marker.name,
    //       index: i,
    //       name: marker.name,
    //       position: marker.coordinates
    //     }
    //     let thisMarker = new this.props.google.maps.Marker({
    //       position: marker.coordinates,
    //     })
    //     markerProps.push(theseProps)
    //     markers.push(thisMarker)
    //   })
    //   this.markerPropsArray = markerProps
    //   this.markersArray = markers


        this.props.markers.forEach(marker => {
            const newLI = document.createElement('li')
            newLI.innerHTML = marker.name;
            if (this.props.associatedMarkers.length !== 0) {
                console.log(this.props.associatedMarkerProps)
                console.log(this.props.associatedMarkers)
                console.log("our markers array has markers")
                let associatedMarker = this.props.associatedMarkers[i]
                console.log(associatedMarker)
                let associatedMarkerProp = this.props.associatedMarkerProps[i]
                console.log(associatedMarkerProp)
                newLI.addEventListener('click', function() {
                    console.log("click LI")
                    console.log(clickLI)
                    console.log(associatedMarkerProp)
                    console.log(associatedMarker)
                    clickLI(associatedMarkerProp, associatedMarker)
                })
            }
            document.getElementById('list-view-list').appendChild(newLI)
            i++
        })
    }

    componentDidMount() {
        console.log("ListView Mounted")
        // this.populateList();
    }

    // componentDidUpdate() {
    //     this.populateList();
    // }

    render() {

        return(
            <div className="list-view-container">
                <h2>List View</h2>
                <ul>
                <li>
                    <button
                        onClick={this.props.buttonOneOnClick}
                    >{this.props.buttonOneText}</button></li>
                <li>
                    <button
                        onClick={this.props.buttonTwoOnClick}
                    >{this.props.buttonTwoText}</button></li>

                </ul>
                <ul id="list-view-list">
                {/* An appropriately filtered list of our locations will go here whenever the `.populateList()` method is invoked.
                */}
                </ul>
            </div>
        )
    }
}

export default ListView