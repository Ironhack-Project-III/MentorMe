import React from 'react';

class SearchBarMentees extends React.Component {

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.setQuery(name, value);
      };
    
    render() {
        return (

            <div> 
                <label htmlFor="searchBar">Search</label>
                <input
                    type="text"
                    name="search"
                    value={this.props.search}
                    onChange={this.handleChange}
                    id="searchBar"
                />
            </div>
        )
    }
}

export default SearchBarMentees;