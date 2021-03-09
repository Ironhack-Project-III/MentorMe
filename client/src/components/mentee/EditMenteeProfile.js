import React, { Component } from 'react'
import axios from 'axios'


export default class EditMenteeProfile extends Component {


  state = {
    mentorProfile: this.props.user,
    nameHeader: this.props.user.firstName,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    age: this.props.user.age,
    nationality: this.props.user.nationality,
    eMail: this.props.user.eMail,
    website: this.props.user.website,
    requiredSupport: this.props.user.requiredSupport,
    businessName: this.props.user.businessName,
    businessDescription: this.props.user.businessDescription,
    yearsOfOperation: this.props.user.yearsOfOperation,
    sector: this.props.user.sector,
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
          <label htmlFor="firstName">firstName: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label htmlFor="lastName">lastName: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label htmlFor="age">age: </label>
          <input
            type="number"
            id="age"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <label htmlFor="nationality">nationality: </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={this.state.nationality}
            onChange={this.handleChange}
          />
          <label htmlFor="eMail">eMail: </label>
          <input
            type="text"
            id="eMail"
            name="eMail"
            value={this.state.eMail}
            onChange={this.handleChange}
          />
          <label htmlFor="contactInfo">contactInfo: </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={this.state.contactInfo}
            onChange={this.handleChange}
          />
          <label htmlFor="website">website: </label>
          <input
            type="text"
            id="website"
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
          />
          <label htmlFor="aboutMe">aboutMe: </label>
          <input
            type="text"
            id="aboutMe"
            name="aboutMe"
            value={this.state.aboutMe}
            onChange={this.handleChange}
          />
          <label htmlFor="industryExpertise">industryExpertise: </label>
          <input
            type="text"
            id="industryExpertise"
            name="industryExpertise"
            value={this.state.industryExpertise}
            onChange={this.handleChange}
          />
          <label htmlFor="generalExpertise">generalExpertise: </label>
          <input
            type="text"
            id="generalExpertise"
            name="generalExpertise"
            value={this.state.generalExpertise}
            onChange={this.handleChange}
          />
          <label htmlFor="keyHardSkills">keyHardSkills: </label>
          <input
            type="text"
            id="keyHardSkills"
            name="keyHardSkills"
            value={this.state.keyHardSkills}
            onChange={this.handleChange}
          />
          <label htmlFor="keySoftSkills">keySoftSkills: </label>
          <input
            type="text"
            id="keySoftSkills"
            name="keySoftSkills"
            value={this.state.keySoftSkills}
            onChange={this.handleChange}
          />
          <label htmlFor="keyPersonalityTraits">keyPersonalityTraits: </label>
          <input
            type="text"
            id="keyPersonalityTraits"
            name="keyPersonalityTraits"
            value={this.state.keyPersonalityTraits}
            onChange={this.handleChange}
          />
          <label htmlFor="preferredSectors">preferredSectors: </label>
          <input
            type="text"
            id="preferredSectors"
            name="preferredSectors"
            value={this.state.preferredSectors}
            onChange={this.handleChange}
          />
          <label htmlFor="availableForNewMentorship">availableForNewMentorship: </label>
          <input
            type="checkbox"
            id="availableForNewMentorship"
            name="availableForNewMentorship"
            checked={this.state.availableForNewMentorship}
            onChange={this.handleChange}
          />
          <label htmlFor="activelyMentoring">activelyMentoring: </label>
          <input
            type="checkbox"
            id="activelyMentoring"
            name="activelyMentoring"
            checked={this.state.activelyMentoring}
            onChange={this.handleChange}
          />
          <label htmlFor="availableFromDate">availableFromDate: </label>
          <input
            type="date"
            id="availableFromDate"
            name="availableFromDate"
            value={this.state.availableFromDate}
            onChange={this.handleChange}
          />
          <button type='submit'>Update your Profile</button>
        </form>
      </div>
    )
  }
}
 