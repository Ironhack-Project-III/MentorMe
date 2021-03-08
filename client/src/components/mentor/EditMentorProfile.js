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
    eMail: this.props.user.eMail,
    contactInfo: this.props.user.contactInfo,
    website: this.props.user.website,
    aboutMe: this.props.user.aboutMe,
    industryExpertise: this.props.user.industryExpertise,
    generalExpertise: this.props.user.generalExpertise,
    keyHardSkills: this.props.user.keyHardSkills,
    keySoftSkills: this.props.user.keySoftSkills,
    keyPersonalityTraits: this.props.user.keyPersonalityTraits,
    preferredSectors: this.props.user.preferredSectors,
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
      eMail: this.state.eMail,
      contactInfo: this.state.contactInfo,
      website: this.state.website,
      aboutMe: this.state.aboutMe,
      industryExpertise: this.state.industryExpertise,
      generalExpertise: this.state.generalExpertise,
      keyHardSkills: this.state.keyHardSkills,
      keySoftSkills: this.state.keySoftSkills,
      keyPersonalityTraits: this.state.keyPersonalityTraits,
      preferredSectors: this.state.preferredSectors,
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
          <label htmlFor="eMail">E-Mail: </label>
          <input
            type="text"
            id="eMail"
            name="eMail"
            value={this.state.eMail}
            onChange={this.handleChange}
          />
          <label htmlFor="contactInfo">Contact Info: </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={this.state.contactInfo}
            onChange={this.handleChange}
          />
          <label htmlFor="website">Website: </label>
          <input
            type="text"
            id="website"
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
          />
          <label htmlFor="aboutMe">About Me: </label>
          <input
            type="text"
            id="aboutMe"
            name="aboutMe"
            value={this.state.aboutMe}
            onChange={this.handleChange}
          />
          <label htmlFor="industryExpertise">Industry Expertise: </label>
          <input
            type="text"
            id="industryExpertise"
            name="industryExpertise"
            value={this.state.industryExpertise}
            onChange={this.handleChange}
          />
          <label htmlFor="generalExpertise">General Expertise: </label>
          <input
            type="text"
            id="generalExpertise"
            name="generalExpertise"
            value={this.state.generalExpertise}
            onChange={this.handleChange}
          />
          <label htmlFor="keyHardSkills">Key Hard Skills: </label>
          <input
            type="text"
            id="keyHardSkills"
            name="keyHardSkills"
            value={this.state.keyHardSkills}
            onChange={this.handleChange}
          />
          <label htmlFor="keySoftSkills">Key Soft Skills: </label>
          <input
            type="text"
            id="keySoftSkills"
            name="keySoftSkills"
            value={this.state.keySoftSkills}
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
          <label htmlFor="preferredSectors">Which Sectors Do You Prefer?</label>
          <input
            type="text"
            id="preferredSectors"
            name="preferredSectors"
            value={this.state.preferredSectors}
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
