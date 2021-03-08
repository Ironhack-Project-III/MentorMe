import React, { Component } from 'react'
import axios from 'axios'

export default class MentorList extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  preferredMentors: null,
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

  // handleChange = event => {
  //   console.log(event.target)
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   })
  // }

  likeMentor = event => {
    console.log(event)
    console.log(this.state.user._id)
    axios.put(`/api/mentee/mentor-list/${this.state.user._id}`, {
     preferredMentor: event })
     .then(response => {
       this.setState({
        preferredMentors: response.data.preferredMentors
       })
      //  console.log(this.state.preferredMentors)
     })
     .catch(err => {
      console.log(err)
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
          <button onClick={() => {this.likeMentor(mentor._id)}}>Put mentor on the list </button>
          </div>
        )
      })}

      {this.state.preferredMentors != null &&
      this.state.preferredMentors.map (preferredMentor => { 
        <h3>{preferredMentor.username}</h3>
      })}

      </div>

    )
  }
}
git 