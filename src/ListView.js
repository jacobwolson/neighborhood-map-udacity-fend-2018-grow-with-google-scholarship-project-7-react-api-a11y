import React, { Component } from 'react'
import SelectMenu from './SelectMenu'
class ListView extends Component {
    
    markerPropsArray = []
    markersArray = []

    // Consulted for creating and adding new LI: https://www.w3schools.com/jsref/met_node_appendchild.asp
    // Code for clearing list: https://stackoverflow.com/a/27324794
    populateList = () => {
        const listViewList = document.getElementById('list-view-list')
        if (listViewList) {
            listViewList.innerHTML = ''
        
        let clickLI = this.props.onClickLI
        let i = 0;
        let markerPropsList = this.props.markerPropsList
        let markersList = this.props.markersList
        markerPropsList.forEach(markerProp => {
            const newLI = document.createElement('li')
            newLI.innerHTML = markerProp.name;
            let associatedMarker = markersList[i]
            let associatedMarkerProps = markerPropsList[i]
            newLI.addEventListener('click', () => clickLI(associatedMarkerProps, associatedMarker))
            listViewList.appendChild(newLI)
            i++
        })
        }
    }

    render() {

        return(
            <div className="list-view-container">
                <SelectMenu
                    filterLocations={this.props.filterLocations}
                />
                <ul id="list-view-list">
                {/* An appropriately filtered list of our locations will go here whenever the `.populateList()` method is invoked.
                */}
                </ul>
            </div>
        )
    }
}

export default ListView