import React, { Component } from 'react'

export default class MentorDetailDC extends Component {
  
  state = {
    mentor: this.props.mentor,
    allMentors: null,
    detailView: false
  }

  detailView = () => {
    this.setState((prevState) => ({
      detailView: !prevState.detailView
    }))
  }
  
  render() {
    return (
      <div>
         <button onClick={this.detailView}>Details</button>
         {this.state.detailView && (
          <>
          <p>Available For New Mentorship? {String(this.props.mentor.availableForNewMentorship)}</p>
          <p>Actively Mentoring? {String(this.props.mentor.activelyMentoring)}</p>
          <p>Available From Date: {this.props.mentor.availableFromDate}</p>
          <p>Age: {this.props.mentor.age}</p>
          <p>Nationality: {this.props.mentor.nationality}</p>
          <p>Contact Details: {this.props.mentor.contactDetails}</p>
          <p>Industry Expertise: {this.props.mentor.industryExpertise}</p>
          <p>Experience: {this.props.mentor.experience}</p>
          <p>Key Skills: {this.props.mentor.keySkills}</p>
          <p>Key Personality Traits: {this.props.mentor.keyPersonalityTraits}</p>
          </>
        )} 
      </div>
    )
  }
}
