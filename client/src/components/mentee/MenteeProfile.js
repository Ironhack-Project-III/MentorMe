import React, { Component } from 'react'
import axios from 'axios'
import EditMenteeProfile from './EditMenteeProfile'

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
        console.log(response)
        this.setState({
          menteeProfile: response.data
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
    if (this.state.menteeProfile === null) {
      return <h3>Loading...</h3>
    }    return (
      
      <div>
        <h1>Your Mentee Profile</h1>

        <p>Username: {this.state.menteeProfile.username}</p> 

      </div>
    )
  }
}