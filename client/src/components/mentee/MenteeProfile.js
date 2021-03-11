import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

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
      
      <div>
        <h1>Your Mentee Profile</h1>

        <img src={this.state.menteeProfile.imgPath} alt="userPhoto"/>
        <p>Username: {this.props.user.username}</p> 
        <p>First Name: {this.state.menteeProfile.firstName}</p>
        <p>Last Name: {this.state.menteeProfile.lastName}</p>
        <p>Age: {this.state.menteeProfile.age}</p>
        <p>Nationality: {this.state.menteeProfile.nationality}</p>
        <p>Contact Details: {this.state.menteeProfile.contactDetails}</p>
        <p>Required Support: {this.state.menteeProfile.requiredSupport}</p>
        <p>Business Name: {this.state.menteeProfile.businessName}</p>
        <p>Business Description: {this.state.menteeProfile.businessDescription}</p>
        <p>Years of Operation: {this.state.menteeProfile.yearsOfOperation}</p>
        <p>Sector: {this.state.menteeProfile.sector}</p>
        <p>Website: {this.state.menteeProfile.website}</p>

        <Link style={{color:'blue'}} to={`/mentee/profile/${this.state.menteeProfile._id}/edit`}>
              Edit your profile
        </Link>

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