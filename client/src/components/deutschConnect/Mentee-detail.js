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
            <div className="mentorship-information-category">Active Mentorship</div> <div className="mentorship-information-content">{this.props.mentee.activeMentorship}</div>
            <div className="mentorship-information-category">Available From Date</div> <div className="mentorship-information-content">{this.props.mentee.availableFromDate}</div>
            <div className="mentors-preferred">
              <h3>Preferred Mentors</h3> {preferred}
            </div>
            <div className="mentorship-information-category">Required Support </div><div className="mentorship-information-content">{this.props.mentee.requiredSupport}</div>
            <div className="mentorship-information-category">Age</div> <div className="mentorship-information-content">{this.props.mentee.age}</div>
            <div className="mentorship-information-category">Nationality </div><div className="mentorship-information-content">{this.props.mentee.nationality}</div>
            <div className="mentorship-information-category">Contact Details</div> <div>{this.props.mentee.contactDetails}</div>
            <div className="mentorship-information-category">Key Personality Traits </div> <div className="mentorship-information-content">{this.props.mentee.keyPersonalityTraits} </div>
            <div className="mentorship-information-category">Business Name</div> <div className="mentorship-information-content">{this.props.mentee.businessName}</div>
            <div className="mentorship-information-category">Business Description</div> <div className="mentorship-information-content">{this.props.mentee.businessDescription}</div>
            <div className="mentorship-information-category">Years Of Operation </div><div className="mentorship-information-content">{this.props.mentee.yearsOfOperation}</div>
            <div className="mentorship-information-category">Business Website</div> <div className="mentorship-information-content">{this.props.mentee.website}</div>
            <div className="mentorship-information-category">Sector </div><div className="mentorship-information-content">{this.props.mentee.sector}</div>
          </div>
        )} 
      </div>
    )
  }
}
