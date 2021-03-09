import React, { Component } from 'react'
import axios from 'axios'


export default class EditMentorProfile extends Component {

  state = {
    mentorProfile: this.props.user,
    nameHeader: this.props.user.firstName,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    age: this.props.user.age,
    nationality: this.props.user.nationality,
    contactDetails: this.props.user.contactDetails,
    experience: this.props.user.experience,
    industryExpertise: this.props.user.industryExpertise,
    keySkills: this.props.user.keySkills,
    keyPersonalityTraits: this.props.user.keyPersonalityTraits,
    availableForNewMentorship: this.props.user.availableForNewMentorship,
    activelyMentoring: this.props.user.activelyMentoring,
    availableFromDate: this.props.user.availableFromDate
  }

 
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    })
    console.log('Step1', this.state)
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.put(`/api/mentor/profile/${this.state.mentorProfile._id}/edit`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      nationality: this.state.nationality,
      contactDetails: this.state.contactDetails,
      experience: this.state.experience,
      industryExpertise: this.state.industryExpertise,
      keySkills: this.state.keySkills,
      keyPersonalityTraits: this.state.keyPersonalityTraits,
      availableForNewMentorship: this.state.availableForNewMentorship,
      activelyMentoring: this.state.activelyMentoring,
      availableFromDate: this.state.availableFromDate,
    })
      .then(response => {

        //update usersession with updated data to get it without the need of refreshing the browser window
       this.props.setUser(response.data)
        //redirect to profile
       this.props.history.push(`/mentor/profile/${response.data._id}`)

      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    
    return (
      
      <div>
        <h1>Edit Your Mentor Profile, {this.state.nameHeader}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            id="age"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <label htmlFor="nationality">Nationality: </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={this.state.nationality}
            onChange={this.handleChange}
          />

          <label htmlFor="contactDetails">Contact Details: </label>
          <input
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={this.state.contactDetails}
            onChange={this.handleChange}
          />
         
          <label htmlFor="experience">Experience: </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={this.state.experience}
            onChange={this.handleChange}
          />
          <label htmlFor="industryExpertise">Industry Expertise: </label>
          <input
            type="text"
            id="generalExpertise"
            name="industryExpertise"
            value={this.state.industryExpertise}
            onChange={this.handleChange}
          />
          <label htmlFor="keySkills">Key Skills: </label>
          <input
            type="text"
            id="keySkills"
            name="keySkills"
            value={this.state.keySkills}
            onChange={this.handleChange}
          />

          <label htmlFor="keyPersonalityTraits">Key Personality Traits: </label>
          <input
            type="text"
            id="keyPersonalityTraits"
            name="keyPersonalityTraits"
            value={this.state.keyPersonalityTraits}
            onChange={this.handleChange}
          />

          <label htmlFor="availableForNewMentorship">Are You Available For A New Mentorship?</label>
          <input
            type="checkbox"
            id="availableForNewMentorship"
            name="availableForNewMentorship"
            checked={this.state.availableForNewMentorship}
            onChange={this.handleChange}
          />
          <label htmlFor="activelyMentoring">Do Have Active Mentorships At The Moment?</label>
          <input
            type="checkbox"
            id="activelyMentoring"
            name="activelyMentoring"
            checked={this.state.activelyMentoring}
            onChange={this.handleChange}
          />
          <label htmlFor="availableFromDate">From When On Will You Be Available For A New Mentorship?</label>
          <input
            type="date"
            id="availableFromDate"
            name="availableFromDate"
            value={this.state.availableFromDate}
            onChange={this.handleChange}
          />
          <button type='submit'>Update Your Profile</button>
        </form>
      </div>
    )
  }
}
