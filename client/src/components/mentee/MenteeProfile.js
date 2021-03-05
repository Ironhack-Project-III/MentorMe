import React, { Component } from 'react'

export default class MenteeProfile extends Component {
  render() {
    console.log(this.props.user.username)
    return (
      
      <div>
        <h1>Your Mentee Profile</h1>

        <p>Username: {this.props.user.username}</p> 

      </div>
    )
  }
}