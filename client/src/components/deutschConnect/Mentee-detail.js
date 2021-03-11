import React, { Component } from 'react'
import './DC.css';

export default class MenteeDetailDC extends Component {
  
  state = {
    mentee: this.props.mentee,
    allMentees: null,
    detailView: false
  }

  detailView = () => {
    this.setState((prevState) => ({
      detailView: !prevState.detailView
    }))
  }
  
  render() {

    const preferred = this.props.mentee.preferredMentors.map( (mentor, index) => {
      return (
          <div key={mentor._id}>
            <p className="num"> {index+1}. </p>
            <div className="mentorship-information-category">Username </div><div className="mentorship-information-content">{mentor.username}</div>
            <div className="mentorship-information-category">First Name</div> <div className="mentorship-information-content">{mentor.firstName}</div>
            <div className="mentorship-information-category">Last Name</div> <div className="mentorship-information-content">{mentor.lastName}</div>
            <p>----</p>
          </div>
      )
    })
    
    //console.log(preferred)
    return (
      <div className="details-body">
          <div className="button-container">
            <button className="form-button" onClick={this.detailView}>Details</button>
          </div>
         {this.state.detailView && (
          <div className="mentorship-information">
            <p>Active Mentorship? {this.props.mentee.activeMentorship}</p>
            <p>Available From Date: {this.props.mentee.availableFromDate}</p>
            <div className="mentors-preferred">
              <h3>Preferred Mentors</h3> {preferred}
            </div>
            <p>Required Support: {this.props.mentee.requiredSupport}</p>
            <p>Age: {this.props.mentee.age}</p>
            <p>Nationality: {this.props.mentee.nationality}</p>
            <p>Contact Details: {this.props.mentee.contactDetails}</p>
            <p>Key Personality Traits: {this.props.mentee.keyPersonalityTraits}</p>
            <p>Business Name: {this.props.mentee.businessName}</p>
            <p>Business Description: {this.props.mentee.businessDescription}</p>
            <p>Years Of Operation: {this.props.mentee.yearsOfOperation}</p>
            <p>Business Website: {this.props.mentee.website}</p>
            <p>Sector: {this.props.mentee.sector}</p>
          </div>
        )} 
      </div>
    )
  }
}
