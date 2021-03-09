import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';





export default class MentorProfile extends Component {


  state = {
    user: this.props.user,
    mentorProfile: null,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(`/api/mentor/profile/${this.props.match.params.id}`)
      .then(response => {
        console.log(response)
        this.setState({
          mentorProfile: response.data
        })
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 404) {
          // we have a 404 error
          this.setState({
            error: 'Not found 🤷🏽‍♀️ 🤷🏾'
          })
        }
      })
  }


  render() {
    if (this.state.mentorProfile === null) {
      return <h3>Loading...</h3>
    }
    return (
      
      <div>
        <h1>Your Mentor Profile</h1>

        <img src={this.state.mentorProfile.imgPath} alt="userPhoto"/>
        <p>Username: {this.props.user.username}</p> 
        <p>First Name: {this.state.mentorProfile.firstName}</p>
        <p>Last Name: {this.state.mentorProfile.lastName}</p>
        <p>Age: {this.state.mentorProfile.age}</p>
        <p>Nationality: {this.state.mentorProfile.nationality}</p>
        <p>Contact Details: {this.state.mentorProfile.contactDetails}</p>
        <p>Industry Expertise: {this.state.mentorProfile.industryExpertise}</p>
        <p>Experience: {this.state.mentorProfile.experience}</p>
        <p>Key Skills: {this.state.mentorProfile.keySkills}</p>
        <p>Your Key Personality Traits: {this.state.mentorProfile.keyPersonalityTraits}</p>
        <p>Are You Available For A New Mentorship? {String(this.state.mentorProfile.availableForNewMentorship)}</p>
        <p>Do Have Active Mentorships At The Moment? {String(this.state.mentorProfile.activelyMentoring)}</p>
        <p>From When On Will You Be Available For A New Mentorship? {this.state.mentorProfile.availableFromDate}</p>

      
        <Link to={`/mentor/profile/${this.props.user._id}/edit`}>
              Edit your Profile
        </Link>

      </div>
    )
  }
}
