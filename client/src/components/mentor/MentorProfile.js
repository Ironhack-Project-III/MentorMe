import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../../App.css';
import './mentor.css'




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
        //console.log(response)
        this.setState({
          mentorProfile: response.data
        })
      })
      .catch(err => {
        //console.log(err.response)
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
      
      <div className="body">
        <h2>Your Profile</h2>
        
        <img className='profile-picture'src={this.state.mentorProfile.imgPath} alt="userPhoto"/>
        
        <div className="mentorship-information">
        <div className="mentorship-information-category"> Username</div> <div className="mentorship-information-content"> {this.props.user.username} </div>
        <div className="mentorship-information-category"> First Name </div> <div className="mentorship-information-content">{this.state.mentorProfile.firstName}</div>
        <div className="mentorship-information-category"> Last Name</div> <div className="mentorship-information-content"> {this.state.mentorProfile.lastName}</div>
        <div className="mentorship-information-category"> Age:</div> <div className="mentorship-information-content"> {this.state.mentorProfile.age}</div>
        <div className="mentorship-information-category"> Nationality</div> <div className="mentorship-information-content"> {this.state.mentorProfile.nationality}</div>
        <div className="mentorship-information-category"> Contact Details </div> <div className="mentorship-information-content">{this.state.mentorProfile.contactDetails}</div>
        <div className="mentorship-information-category"> Industry Expertise </div> <div className="mentorship-information-content">{this.state.mentorProfile.industryExpertise}</div>
        <div className="mentorship-information-category"> Experience </div> <div className="mentorship-information-content">{this.state.mentorProfile.experience}</div>
        <div className="mentorship-information-category"> Key Skills</div> <div className="mentorship-information-content"> {this.state.mentorProfile.keySkills}</div>
        <div className="mentorship-information-category"> Your Key Personality Traits </div> <div className="mentorship-information-content">{this.state.mentorProfile.keyPersonalityTraits}</div>
        <div className="mentorship-information-category"> Are You Available For A New Mentorship? </div> <div className="mentorship-information-content">{String(this.state.mentorProfile.availableForNewMentorship)}</div>
        <div className="mentorship-information-category"> Do Have Active Mentorships At The Moment? </div> <div className="mentorship-information-content">{String(this.state.mentorProfile.activelyMentoring)}</div>
        <div className="mentorship-information-category"> From When On Will You Be Available For A New Mentorship?</div> <div className="mentorship-information-content"> {this.state.mentorProfile.availableFromDate}</div>
        </div>

        <div className="button-container">

        <div className="button">
      
          <Link className="button-text" to={`/mentor/profile/${this.props.user._id}/edit`}>
                Edit
          </Link>


          </div>
        </div>
      </div>
    )
  }
}
