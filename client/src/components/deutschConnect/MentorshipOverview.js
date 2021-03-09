import React, { Component } from 'react'
import axios from 'axios'
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
        console.log(response, 'the response')
        this.setState({
          allMentorships: response.data
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