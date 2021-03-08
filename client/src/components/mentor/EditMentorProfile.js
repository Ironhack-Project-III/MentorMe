import React, { Component } from 'react'

export default class EditMentorProfile extends Component {
  render() {
    
    return (
      
      <div>
        <h1>Edit Your Mentor Profile</h1>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="firstName">firstName: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.props.firstName}
            onChange={this.props.handleChange}
          />
          <button type='submit'>Update your Profile</button>
        </form>
      </div>
    )
  }
}