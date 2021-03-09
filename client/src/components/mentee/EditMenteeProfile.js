import React, { Component } from 'react'
import axios from 'axios'


export default class EditMenteeProfile extends Component {


  state = {
    menteeProfile: this.props.user,
    nameHeader: this.props.user.firstName,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    age: this.props.user.age,
    nationality: this.props.user.nationality,
    contactDetails: this.props.user.contactDetails,
    website: this.props.user.website,
    requiredSupport: this.props.user.requiredSupport,
    businessName: this.props.user.businessName,
    businessDescription: this.props.user.businessDescription,
    yearsOfOperation: this.props.user.yearsOfOperation,
    sector: this.props.user.sector,
    keyPersonalityTraits: this.props.user.keyPersonalityTraits,
    availableForNewMentorship: this.props.user.availableForNewMentorship,
    activeMentorship: this.props.user.activeMentorship,
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

    axios.put(`/api/mentee/profile/${this.state.menteeProfile._id}/edit`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      nationality: this.state.nationality,
      contactDetails: this.state.contactDetails,
      website: this.state.website,
      requiredSupport: this.state.requiredSupport,
      businessName: this.state.businessName,
      businessDescription: this.state.businessDescription,
      yearsOfOperation: this.state.yearsOfOperation,
      sector: this.state.sector,
      keyPersonalityTraits: this.state.keyPersonalityTraits,
      availableForNewMentorship: this.state.availableForNewMentorship,
      activeMentorship: this.state.activeMentorship,
      availableFromDate: this.state.availableFromDate
    })
      .then(response => {

        //update usersession with updated data to get it without the need of refreshing the browser window
       this.props.setUser(response.data)
        //redirect to profile
       this.props.history.push(`/mentee/profile/${response.data._id}`)

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
          <label htmlFor="contactDetails">Contact Details: </label>
          <input
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={this.state.contactDetails}
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
         
          <label htmlFor="requiredSupport">Required Support: </label>
          <input
            type="text"
            id="requiredSupport"
            name="requiredSupport"
            value={this.state.requiredSupport}
            onChange={this.handleChange}
          />

          <label htmlFor="businessName">Business Name: </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={this.state.businessName}
            onChange={this.handleChange}
          />

          <label htmlFor="businessDescription">Business Description: </label>
          <input
            type="text"
            id="businessDescription"
            name="businessDescription"
            value={this.state.businessDescription}
            onChange={this.handleChange}
          />

          <label htmlFor="yearsOfOperation">Years of Operation: </label>
          <input
            type="text"
            id="yearsOfOperation"
            name="yearsOfOperation"
            value={this.state.yearsOfOperation}
            onChange={this.handleChange}
          />

          <label htmlFor="sector">Years of Operation: </label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={this.state.sector}
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
          
          <label htmlFor="availableForNewMentorship">availableForNewMentorship: </label>
          <input
            type="checkbox"
            id="availableForNewMentorship"
            name="availableForNewMentorship"
            checked={this.state.availableForNewMentorship}
            onChange={this.handleChange}
          />
          <label htmlFor="activeMentorship">activeMentorship: </label>
          <input
            type="checkbox"
            id="activeMentorship"
            name="activeMentorship"
            checked={this.state.activeMentorship}
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
 