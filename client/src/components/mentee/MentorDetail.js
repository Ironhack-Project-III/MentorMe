import React, { Component } from 'react'
import './mentee.css'

export default class MentorDetail extends Component {
  
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
      <div className="button-container">
         <button className = "form-button" onClick={this.detailView}>Details</button>
         </div>
         {this.state.detailView && (
          <>
          <h3>Details</h3> 
          <div className="mentorship-information-category">Industry Expertise</div> <div className="mentorship-information-content">{this.props.mentor.industryExpertise}</div>
          <div className="mentorship-information-category">Experience</div> <div className="mentorship-information-content">{this.props.mentor.experience}</div>
          <div className="mentorship-information-category">Key Skills</div> <div className="mentorship-information-content">{this.props.mentor.keySkills}</div>
          <div className="mentorship-information-category">Available FromDate </div> <div className="mentorship-information-content">{this.props.mentor.availableFromDate}</div>
          </>
        )} 
      </div>
    )
  }
}
