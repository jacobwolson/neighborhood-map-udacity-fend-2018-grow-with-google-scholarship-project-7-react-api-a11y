import React, { Component } from 'react'

class ListView extends Component {
    
    // Consulted for creating and adding new LI: https://www.w3schools.com/jsref/met_node_appendchild.asp
    // Code for clearing list: https://stackoverflow.com/a/27324794
    populateList = () => {
        const listViewList = document.getElementById('list-view-list')
        listViewList.innerHTML = ''
        this.props.markers.forEach(marker => {
            const newLI = document.createElement('li')
            newLI.innerHTML = marker.name;
            newLI.addEventListener('click', function() {
                const associatedMarker = document.getElementById(marker.name)
                console.log(associatedMarker)
                associatedMarker.click();
            });
            document.getElementById('list-view-list').appendChild(newLI)
        })
    }

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
                {/* An appropriately filtered list of our locations will go here when the `.populateList()` method is invoked.
                */}
                </ul>
            </div>
        )
    }
}

export default ListView