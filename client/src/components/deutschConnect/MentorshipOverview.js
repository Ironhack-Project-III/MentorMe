import React, { Component } from 'react'
import axios from 'axios'

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
        console.log(response)
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
  if (this.state.allMentorships === null) {
    return <h3>Loading...</h3>
  } return (
    <div>
      {console.log('test')}
      <h1>Mentorship Overview</h1>
      {this.state.allMentorships.map(mentorship => {
        return (
          
          <p>{mentorship}</p>
      )
    })}

    </div>
  )
}
}