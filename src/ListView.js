/* Doug Brown's walkthrough influeced my refactoring of this component: the general technique 
    for dynamically creating the `li` inside the `return()` function -- rather than in a method that appends
    the `li` in to the `ul` -- and the choice to add button elements inside of each `li` rather than create 
    buttons out of the `li` in particular. 
*/

import React, { Component } from 'react'
import SelectMenu from './SelectMenu'
// We are going with a stateless functional component here.
// Source consulted: https://stackoverflow.com/a/28329640
const ListView = (props) => {
    render() {
        return(
            <section className="list-view-container">
                <SelectMenu
                    filterLocations={props.filterLocations}
                />
                <h3 tabIndex="0">Locations Displayed</h3>
                <ul id="locations-list">
                {props.markerPropsProp.map((markerProp, i) => {
                    return <li
                                // `aria-labelledby` attribute added to list items per a direct suggestion from a Udacity reviewer.
                                aria-labelledby="locations-list"
                                key={markerProp.name}
                            >
                                <button 
                                    className="locations-list-button"
                                    onClick={e => props.onClickLI(props.markerPropsProp[i], props.markersList[i])}>
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