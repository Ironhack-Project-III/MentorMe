import React, { Component } from 'react'
import './DC.css';

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
    //console.log('hello1', mentorshipId, startDate, endDate)
  }  

  render() {
    
    return (
      <div className = 'details-body'>
        <div>
          <div className="button-container">
            <button className="form-button" onClick={() => {this.toggleEditForm()}}>Change Dates</button>
          </div>
          {this.state.toggled ?
          <div style={{marginRight:"25px"}}>
            <form className="mentorship-information" onSubmit={(event) => this.handleSubmit(event, this.props.mentorship._id, this.state.startDate, this.state.endDate)}>
              <label className="profile-information-category" htmlFor="startDate">Start Date: </label>
              <input className="profile-information-content-update"
                type="date"
                id="startDate"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleChange}
                />
              <label className="profile-information-category" htmlFor="endDate">End Date: </label>
              <input className="profile-information-content-update"
                type="date"
                id="endDate"
                name="endDate"
                value={this.state.endDate}
                onChange={this.handleChange}
                />
              <div className="button-container">
                <button className="form-button" type='submit'>Update</button>
              </div>
            </form>
          </div>
           : '' }
        </div>
      </div>
    )
  }
}