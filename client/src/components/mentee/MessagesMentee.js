import React, { Component } from 'react'

export default class MessagesMentee extends Component {
  
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
          <h3>Details</h3> 
          <p>Industry Expertise: {this.props.mentor.industryExpertise}</p>
          <p>Experience: {this.props.mentor.experience}</p>
          <p>Key Skills: {this.props.mentor.keySkills}</p>
          <p>Available From Date: {this.props.mentor.availableFromDate}</p>
          </>
        )} 
      </div>
    )
  }
}