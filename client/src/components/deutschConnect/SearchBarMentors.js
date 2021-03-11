import React from 'react';
import './DC.css'

class SearchBarMentors extends React.Component {

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.setQuery(name, value);
      };
    
    render() {
        return (

            <div> 
                <input className="form-search"
                    type="text"
                    name="search"
                    value={this.props.search}
                    onChange={this.handleChange}
                    id="searchBar"
                    placeholder="Search for keyword.."
                />

            </div>
        )
    }
}

export default SearchBarMentors;