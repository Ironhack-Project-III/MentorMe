import React, { Component } from 'react'

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

    const preferred = this.props.mentee.preferredMentors.map( mentor => mentor)
    return (
      <div>
         <button onClick={this.detailView}>Details</button>
         {this.state.detailView && (
          <>
          <p>Active Mentorship? {this.props.mentee.activeMentorship}</p>
          <p>Available From Date: {this.props.mentee.availableFromDate}</p>
          <p>Preferred Mentors: {preferred}</p>
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
          </>
        )} 
      </div>
    )
  }
}
