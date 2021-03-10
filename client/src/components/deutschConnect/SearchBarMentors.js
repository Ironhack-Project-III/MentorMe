import React from 'react';

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
                <label htmlFor="searchBar">Search</label>
                <input
                    type="text"
                    name="search"
                    value={this.props.search}
                    onChange={this.handleChange}
                    id="searchBar"
                />
                <label htmlFor="availableCheckBox">
                    Only show available mentors
                </label>
                <input
                    name="availableCheckBox"
                    checked={this.props.availableCheckBox}
                    type="checkbox"
                    id="availableCheckBox"
                    onChange={this.handleChange}
                />

                <label htmlFor="activeCheckBox">
                    Only show mentors in active mentorships
                </label>
                <input
                    name="activeCheckBox"
                    checked={this.props.activeCheckBox}
                    type="checkbox"
                    id="activeCheckBox"
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default SearchBarMentors;