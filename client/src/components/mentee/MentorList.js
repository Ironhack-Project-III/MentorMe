import React, { Component } from 'react'
import axios from 'axios'
import MentorDetail from './MentorDetail'

export default class MentorList extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  // preferredMentors: [],
  error: null,
  detailView: null
}

componentDidMount() {
  this.getMentors();
  // this.setState({
  //   preferredMentors: this.props.user.preferredMentors
  // })
  // this.state.prefferedMentors = this.props.user.prefferedMentors
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

  likeMentor = mentorId => {
    console.log(this.props.user.preferredMentors)
    if (this.props.user.preferredMentors.includes(mentorId)) {
    console.log(mentorId)
    console.log(this.state.user._id)
    axios.put(`/api/mentee/mentor-list/${this.state.user._id}/unlike`, {
      preferredMentor: mentorId })
      .then(response => {
        this.setState({
         preferredMentors: response.data.preferredMentors
        })
        //update the setUser in App.js after the prefrred mentor array gets updated
        this.props.setUser(response.data)
       //  console.log(this.state.preferredMentors)
      })
      .catch(err => {
       console.log(err)
     })
    
    } else {
      axios.put(`/api/mentee/mentor-list/${this.state.user._id}/like`, {
        preferredMentor: mentorId })
        .then(response => {
          this.setState({
           preferredMentors: response.data.preferredMentors
          })
          //update the setUser in App.js after the prefrred mentor array gets updated
          this.props.setUser(response.data)
         //  console.log(this.state.preferredMentors)
        })
        .catch(err => {
         console.log(err)
       })
  
    }
  }

  detailView = (mentorId) => {
    this.setState({
      detailView: mentorId
    })
      
    if (this.state.detailViewSelector) { 
      <MentorDetail
        {...this.props} 
      />
      }
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
          <button onClick={() => {this.detailView(mentor._id)}}>Details</button>
        
          </div>

        )
      })}

      </div>

    )
  }
}