import React, { Component } from 'react'
import axios from 'axios'
import EditMentorship from './EditMentorship'
//import { v4 as uuid } from "uuid";

export default class MentorshipOverview extends Component {
  state = {
    allMentorships: null,
    error: null
  }
  
  componentDidMount() {
    this.getMentorships();
  }
  
  getMentorships = () => {
    axios.get(`/api/deutschconnect/mentorships-overview`)
      .then(response => {
        //console.log(response, 'the response')
        this.setState({
          allMentorships: response.data
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

    deleteMentorship = (event) => {
      console.log('event:', event)
      axios.delete(`/api/deutschconnect/mentorships-overview/${event}`)
        .then( response => {
          console.log('the response', response)
          // we want to redirect to the projects list

          //filter doesnt mutate the state
          this.setState({
            allMentorships: this.state.allMentorships.filter( m => m._id !== response.data._id )
          })
          this.props.history.push('/deutschconnect/mentorships-overview')
        })
        .catch(err => {
          console.log(err)
        })
    }

    // handleChange = event => {
    //   const { name, value } = event.target;
    //   this.setState({
    //     [name]: value
    //   })
    // }
  
    handleSubmit = (mentorshipId, mentorshipDates) => {
      //event.preventDefault();
      
      console.log('hello2', mentorshipId, mentorshipDates)
      // axios.put(`/api/mentor/profile/${this.state.mentorProfile._id}`, {
      //   firstName: this.state.firstName
      // })
      //   .then(response => {
      //     this.setState({
      //       mentorProfile: response.data,
      //       firstName: response.data.firstName,
      //       editForm: false
      //     })
  
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }  
  

render() {
  let mentorshipProfiles;
  if (this.state.allMentorships === null) {
    return <h3>Loading...</h3>
  } else {
    mentorshipProfiles = this.state.allMentorships.map((mentorship, index) => {
      //mentorship.id = uuid();
      return (
        <div key={index}>
          <p>Mentorname: {mentorship.mentor.firstName} {mentorship.mentor.lastName}</p>
          <p>Mentor username: {mentorship.mentor.username}</p>
          <p>Menteename: {mentorship.mentee.firstName} {mentorship.mentee.lastName}</p>
          <p>Mentee username: {mentorship.mentee.username}</p>
          <p>{mentorship.startDate} - {mentorship.endDate}</p>
          <p>Confirmed: {String(mentorship.confirmed)}</p>
          <button onClick={() => {this.deleteMentorship(mentorship._id)}}>Delete this Mentorship</button>
          <EditMentorship
            user={this.props.user}
            mentorship = {mentorship}
            handleSubmit={this.handleSubmit}
            {...this.state}
          />
        </div>
        )
    })
  }
  
  
  return (
    <div>
      {console.log('test')}
      <h1>Mentorship Overview</h1>

        {mentorshipProfiles}

    </div>
    )
  }
}