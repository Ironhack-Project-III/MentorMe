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
        <p>E-Mail: {this.state.mentorProfile.eMail}</p>
        <p>Contact Info: {this.state.mentorProfile.contactInfo}</p>
        <p>Website: {this.state.mentorProfile.website}</p>
        <p>About Me: {this.state.mentorProfile.aboutMe}</p>
        <p>Key Industry Expertise: {this.state.mentorProfile.industryExpertise}</p>
        <p>General Expertise: {this.state.mentorProfile.generalExpertise}</p>
        <p>Key Hard Skills: {this.state.mentorProfile.keyHardSkills}</p>
        <p>Key Soft Skills: {this.state.mentorProfile.keySoftSkills}</p>
        <p>Your Key Personality Traits: {this.state.mentorProfile.keyPersonalityTraits}</p>
        <p>Which Sectors Do You Prefer? {this.state.mentorProfile.preferredSectors}</p>
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
