import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './mentee.css'

export default class MenteeProfile extends Component {
  
  state = {
    menteeProfile: null,
    editForm: false,
    firstName: this.props.user.firstName
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(`/api/mentee/profile/${this.props.match.params.id}`)
      .then(response => {
        //console.log(response)
        this.setState({
          menteeProfile: response.data
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
    if (this.state.menteeProfile === null) {
      return <h3>Loading...</h3>
    }    return (
      
      <div className="body">
        <h2>Your Mentee Profile</h2>

        <img className='profile-picture' src={this.state.menteeProfile.imgPath} alt="userPhoto"/>
        
        <div className="profile-information">
        <div className="profile-information-category">Username </div> <div className="profile-information-content">{this.props.user.username} </div>
        <div className="profile-information-category">First Name </div> <div className="profile-information-content">{this.state.menteeProfile.firstName}</div>
        <div className="profile-information-category">Last Name</div> <div className="profile-information-content">{this.state.menteeProfile.lastName}</div>
        <div className="profile-information-category">Age</div><div className="profile-information-content"> {this.state.menteeProfile.age}</div>
        <div className="profile-information-category">Nationality</div> <div className="profile-information-content">{this.state.menteeProfile.nationality}</div>
        <div className="profile-information-category">Contact Details</div> <div className="profile-information-content">{this.state.menteeProfile.contactDetails}</div>
        <div className="profile-information-category">Required Support <div className="profile-information-content"></div>{this.state.menteeProfile.requiredSupport}</div>
        <div className="profile-information-category">Business Name</div> <div className="profile-information-content">{this.state.menteeProfile.businessName}</div>
        <div className="profile-information-category">Business Description</div> <div className="profile-information-content">{this.state.menteeProfile.businessDescription}</div>
        <div className="profile-information-category">Years of Operation</div><div className="profile-information-content"> {this.state.menteeProfile.yearsOfOperation}</div>
        <div className="profile-information-category">Sector</div> <div className="profile-information-content">{this.state.menteeProfile.sector}</div>
        <div className="profile-information-category">Website</div> <div className="profile-information-content">{this.state.menteeProfile.website}</div>

        <div className="button-container">
        <div className="button">
        <Link className = "button-text" to={`/mentee/profile/${this.state.menteeProfile._id}/edit`}>
              Edit
        </Link>
        </div>
        </div>

        </div>

      </div>
    )
  }
}

// firstName: String,
//   lastName: String,
//   requiredSupport: Number,
//   nationality: String,
//   requiredSupport: String,
//   businessName: String,
//   businessDescription: String, 
//   yearsOfOperation: String,
//   website: String,
//   sector: String,