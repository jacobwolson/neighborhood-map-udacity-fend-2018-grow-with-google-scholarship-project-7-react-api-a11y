/* General sources for this component: 
    https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
    https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
    https://www.w3schools.com/tags/tag_select.asp
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
*/

import React from 'react'

const SelectMenu = (props) => {
    return (
        // Consulted for choice to assign "presentation" to role in lieu of "none": https://github.com/w3c/aria-practices/issues/515
        <div role="presentation" className="select-menu-container">
            <label tabIndex="0" className="filter-options-label" htmlFor="filter-options">Filter by Location</label>
            <div role="presentation">
                <select 
                    id="filter-options" 
                    // Source for utilization of `onChange()` here: https://stackoverflow.com/a/7231215
                    onChange={() => {
                        // Source for technique used to ascertain value of selected option: https://stackoverflow.com/a/28329640
                        let selectedOption = document.getElementById('filter-options').value
                        props.filterLocations(selectedOption)
                        }
                    }
                >
                    <option className="filter-option" value="anywhere">Anywhere</option>
                    <option className="filter-option" value="eastOfCal">East of Cal Anderson</option>
                    <option className="filter-option" value="southOfCal">South of Cal Anderson</option>
                    <option className="filter-option" value="westOfCal">West of Cal Anderson</option>
                    <option className="filter-option" value="northOfCal">North of Cal Anderson</option>
                </select>
            </div>
        </div>
    )
}

export default SelectMenu