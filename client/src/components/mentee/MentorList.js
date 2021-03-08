import React, { Component } from 'react'
import axios from 'axios'

export default class MentorList extends Component {

state = {
  allMentors: null,
  error: null
}

componentDidMount() {
  this.getMentors();
}

getMentors = () => {
  axios.get(`/api/mentee/mentor-list`)
    .then(response => {
      console.log(response)
      this.setState({
        allMentors: response.data
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
          
          </div>
        )
        
      })}

      </div>

    )
  }
}
