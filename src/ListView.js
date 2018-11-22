import React, { Component } from 'react'

class ListView extends Component {
    
    state = {
        markers: null
    }

    showInfoWindowFromList = (prop, marker) => {
        this.props.onClickLI(prop, marker)
    }
    // Consulted for creating and adding new LI: https://www.w3schools.com/jsref/met_node_appendchild.asp
    // Code for clearing list: https://stackoverflow.com/a/27324794
    populateList = () => {
        const listViewList = document.getElementById('list-view-list')
        listViewList.innerHTML = ''
        let associatedMarkers = this.props.associatedMarkers
        let associatedMarkerProps = this.props.associatedMarkerProps
        let clickLI = this.props.onClickLI
        let i = 0;
        this.props.markers.forEach(marker => {
            const newLI = document.createElement('li')
            newLI.innerHTML = marker.name;
            if (Array.isArray(associatedMarkers)) {
                let associatedMarker = associatedMarkers[i]
                let associatedMarkerProp = associatedMarkerProps[i]
                newLI.addEventListener('click', function() {
                    clickLI(associatedMarkerProp, associatedMarker)
                })
            }
            document.getElementById('list-view-list').appendChild(newLI)
            i++
        })
    }

    // componentDidMount() {
    //     this.populateList();
    // }

    componentDidUpdate() {
        this.populateList();
    }

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