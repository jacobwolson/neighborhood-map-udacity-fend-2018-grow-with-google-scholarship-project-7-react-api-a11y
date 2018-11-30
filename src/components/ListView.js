/* Doug Brown's walkthrough influeced my refactoring of this component: the general technique 
    for dynamically creating the `li` inside the `return()` function -- rather than in a method that appends
    the `li` in to the `ul` -- and the choice to add button elements inside of each `li` rather than create 
    buttons out of the `li` in particular. 
*/

import React, { Component } from 'react'
import SelectMenu from './SelectMenu'
class ListView extends Component {
    render() {
        return(
            <section className="list-view-container">
                <SelectMenu
                    filterLocations={this.props.filterLocations}
                />
                <h3 tabIndex="0">Locations Displayed</h3>
                <ul id="locations-list">
                {this.props.markerPropsProp.map((markerProp, i) => {
                    return <li
                                // `aria-labelledby` attribute added to list items per a direct suggestion from a Udacity reviewer.
                                aria-labelledby="locations-list"
                                key={markerProp.name}
                            >
                                <button 
                                    className="locations-list-button"
                                    onClick={e => this.props.onClickLI(this.props.markerPropsProp[i], this.props.markersList[i])}>
                                    {markerProp.name}
                                </button>
                            </li>
                    })
                }
                </ul>
            </section>
        )
    }
}

export default ListView