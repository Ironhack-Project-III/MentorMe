import React, { Component } from 'react'

export default class EditMentorship extends Component {

  state= {
    startDate: this.props.mentorship.startDate,
    endDate: this.props.mentorship.endDate,
    toggled: false,
  }

  toggleEditForm = () => {
    this.setState((prevState) => ({
      toggled: !prevState.toggled
    }))
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event, mentorshipId, startDate, endDate) => {
    event.preventDefault();
    this.props.handleSubmit(event, mentorshipId, startDate, endDate)
    console.log('hello1', mentorshipId, startDate, endDate)
  }  

  render() {
    
    return (
      
      <div>
        <button onClick={() => {this.toggleEditForm()}}>Change Dates?</button>
        {this.state.toggled ? 
        <div>
          <p>Edit Mentorship</p>
          <form onSubmit={(event) => this.handleSubmit(event, this.props.mentorship._id, this.state.startDate, this.state.endDate)}>
            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
              >
            </input>
            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
              >
            </input>
            <button type='submit'>Update Dates</button>
          </form>
        </div>
         : '' }
      </div>
    )
  }
}