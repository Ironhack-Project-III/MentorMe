import React, { Component } from 'react'
import axios from 'axios'

export default class MentorListDC extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  // preferredMentors: [],
  error: null
}

componentDidMount() {
  this.getMentors();
  // this.setState({
  //   preferredMentors: this.props.user.preferredMentors
  // })
  // this.state.prefferedMentors = this.props.user.prefferedMentors
}

getMentors = () => {
  axios.get(`/api/deutschconnect/mentor-list`)
    .then(response => {
      console.log(response)
      this.setState({
        allMentors: response.data,
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
    console.log(this.props.user)
    console.log(this.state)
    if (this.state.allMentors === null) {
      return <h3>Loading...</h3>
      
    } return (
      
      <div>
      <h1>Mentor Overview</h1>
      {this.state.allMentors.map(mentor => {
        return (
          
          <div key = {mentor._id}> 
          <img style = {{width: "200px"}} src={mentor.imgPath} alt="userPhoto"/>
          <h3>{mentor.username}</h3>
          <button onClick={() => {this.likeMentor(mentor._id)}}> {this.props.user.preferredMentors.includes(mentor._id) ? "Unlike" : "Like"} </button>
          </div>

        )
      })}

      </div>

    )
  }
}