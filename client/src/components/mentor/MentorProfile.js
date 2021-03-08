import React, { Component } from 'react'
import axios from 'axios'
import EditMentorProfile from './EditMentorProfile'


export default class MentorProfile extends Component {


  state = {
    mentorProfile: null,
    editForm: false,
    firstName: this.props.user.firstName
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

  toggleEditForm = () => {
    this.setState((prevState) => ({
      editForm: !prevState.editForm
    }))
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log('update')
    axios.put(`/api/mentor/profile/${this.state.mentorProfile._id}`, {
      firstName: this.state.firstName
    })
      .then(response => {
        this.setState({
          mentorProfile: response.data,
          firstName: response.data.firstName,
          editForm: false
        })
        // this.getData(); / with some changes
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    if (this.state.mentorProfile === null) {
      return <h3>Loading...</h3>
    }
    return (
      
      <div>
        <h1>Your Mentor Profile</h1>
        <button onClick={this.toggleEditForm}>Show/Hide Edit Form</button>
        {this.state.editForm && (
          <EditMentorProfile
            user={this.props.user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            {...this.state}
          />
        )}
        <img src={this.state.mentorProfile.imgPath} alt="userPhoto"/>
        <p>Username: {this.state.mentorProfile.username}</p>
        <p>Username: {this.props.user.username}</p> 
        <p>First Name: {this.state.mentorProfile.firstName}</p>
        <p>Last Name: {this.state.mentorProfile.lastName}</p>
        <p>E-Mail: {this.state.mentorProfile.eMail}</p>
        <p>Contact-Info: {this.state.mentorProfile.contactInfo}</p>
        <p>Website: {this.state.mentorProfile.website}</p>
        <p>About me: {this.state.mentorProfile.aboutMe}</p>
        <p>Industry expertise: {this.state.mentorProfile.industryExpertise}</p>
        <p>Hard skill expertise: {this.state.mentorProfile.hardSkillExpertise}</p>
      </div>
    )
  }
}
