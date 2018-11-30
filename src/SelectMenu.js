// Source: https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
// Source: https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
// Source: https://www.w3schools.com/tags/tag_select.asp
// Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
// Sources: https://stackoverflow.com/questions/19329978/change-selects-option-and-trigger-events-with-javascript
// Source: https://stackoverflow.com/questions/7231157/how-to-submit-form-on-change-of-dropdown-list

import React, { Component } from 'react'

class SelectMenu extends Component {

    render() {
        return (
            // Consulted for choice to assign "presentation" to role in lieu of "none": https://github.com/w3c/aria-practices/issues/515
            <div role="presentation" className="select-menu-container">
                <label tabIndex="0" className="filter-options-label" htmlFor="filter-options">Filter by Location</label>
                <div role="presentation">
                    <select 
                        id="filter-options" 
                        onChange={() => {
                            let selectedOption = document.getElementById('filter-options').value
                            this.props.filterLocations(selectedOption)
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
}

export default SelectMenu