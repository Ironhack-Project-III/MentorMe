import React, { Component } from 'react'

export default class DeutschConnectProfile extends Component {
  render() {
    console.log(this.props.user.username)
    return (
      
      <div>
        <h1>Your DeutschConnect Profile</h1>

        <p>Username: {this.props.user.username}</p> 

      </div>
    )
  }
}