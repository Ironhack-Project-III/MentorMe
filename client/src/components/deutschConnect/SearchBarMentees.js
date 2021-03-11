import React from 'react';
import './DC.css'

class SearchBarMentees extends React.Component {

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.setQuery(name, value);
      };
    
    render() {
        return (

            <div className="searchContainer">
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
                <div>
                    <label htmlFor="toggle" className="toggle switchstyle">
                        Switch to show only not matched mentees <p className="textTransparent">ooo</p>
                    <input className="toggle__input"
                        name="checkBox"
                        checked={this.props.checkBox}
                        type="checkbox"
                        id="toggle"
                        onChange={this.handleChange}
                    />
                    <div className="toggle__fill"></div>
                    </label>
                </div>
                
            </div>
        )
    }
}

export default SearchBarMentees;