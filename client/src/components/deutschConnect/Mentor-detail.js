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
      <div className = 'details-body'>
      <div className="button-container">
         <button className = "form-button" onClick={this.detailView}>Details</button>
         </div>
         {this.state.detailView && (
          
          <div className="mentorship-information">
            <div className="mentorship-information-category"> Available For New Mentorship?</div> <div className="mentorship-information-content">{String(this.props.mentor.availableForNewMentorship)}</div>
             <div className="mentorship-information-category">Actively Mentoring? </div> <div className="mentorship-information-content">{String(this.props.mentor.activelyMentoring)}</div>
             <div className="mentorship-information-category">Available From Date:</div> <div className="mentorship-information-content">{this.props.mentor.availableFromDate}</div>
             <div className="mentorship-information-category">Age:</div> <div className="mentorship-information-content">{this.props.mentor.age}</div>
             <div className="mentorship-information-category">Nationality: </div><div className="mentorship-information-content">{this.props.mentor.nationality}</div>
             <div className="mentorship-information-category">Contact Details:</div> <div className="mentorship-information-content">{this.props.mentor.contactDetails}</div>
             <div className="mentorship-information-category">Industry Expertise: </div> <div className="mentorship-information-content"> {this.props.mentor.industryExpertise} </div>
             <div className="mentorship-information-category">Experience:</div> <div className="mentorship-information-content">{this.props.mentor.experience}</div>
             <div className="mentorship-information-category">Key Skills: </div> <div className="mentorship-information-content">{this.props.mentor.keySkills}</div>
             <div className="mentorship-information-category">Key Personality Traits:</div> <div className="mentorship-information-content">{this.props.mentor.keyPersonalityTraits}</div>
          </div>
         
        )} 
      </div>
    )
  }
}
