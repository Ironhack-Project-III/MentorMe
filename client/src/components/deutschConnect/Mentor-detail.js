import React, { Component } from 'react'
import './DC.css'

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
      <div className = 'body'>
      <div className="button-container">
         <button className = "form-button" onClick={this.detailView}>Details</button>
         </div>
         {this.state.detailView && (
          <>
          <div className="profile-information-category"> Available For New Mentorship?</div> <div className="profile-information-content">{String(this.props.mentor.availableForNewMentorship)}</div>
           <div className="profile-information-category">Actively Mentoring? </div> <div className="profile-information-content">{String(this.props.mentor.activelyMentoring)}</div>
           <div className="profile-information-category">Available From Date:</div> <div className="profile-information-content">{this.props.mentor.availableFromDate}</div>
           <div className="profile-information-category">Age:</div> <div className="profile-information-content">{this.props.mentor.age}</div>
           <div className="profile-information-category">Nationality: </div><div className="profile-information-content">{this.props.mentor.nationality}</div>
           <div className="profile-information-category">Contact Details:</div> <div className="profile-information-content">{this.props.mentor.contactDetails}</div>
           <div className="profile-information-category">Industry Expertise: </div> <div className="profile-information-content"> {this.props.mentor.industryExpertise} </div>
           <div className="profile-information-category">Experience:</div> <div className="profile-information-content">{this.props.mentor.experience}</div>
           <div className="profile-information-category">Key Skills: </div> <div className="profile-information-content">{this.props.mentor.keySkills}</div>
           <div className="profile-information-category">Key Personality Traits:</div> <div className="profile-information-content">{this.props.mentor.keyPersonalityTraits}</div>
          </>
        )} 
      </div>
    )
  }
}
