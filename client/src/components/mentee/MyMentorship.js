import React, { Component } from 'react'
import axios from 'axios'
//import { v4 as uuid } from "uuid";

export default class MyMentorship extends Component {
  state = {
    allMentorships: null,
    messages: [],
    editForm: false,
    message: null,
    error: null
  }
  
  componentDidMount() {
    this.getMentorships();
  }
  
  getMentorships = () => {
    axios.get(`/api/mentee/my-mentorship/${this.props.user._id}`)
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

    handleChange = event => {
      
      console.log(event.target)
      const target = event.target;
      const name = target.name;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value
      })
      // console.log('Step1', this.state.data._id)
    }
  
    sendMessage = (event, mentorshipId) => {
      event.preventDefault();
      console.log(event)
      axios.put(`/api/mentee/my-mentorship/${mentorshipId}`, {
        // mentor: this.state
        newMessage: this.state.message
      })
        .then(response => {
          this.setState({
            messages: response.data.messages
          })
         this.props.history.push('/mentee/my-mentorship')
        })
        .catch(err => {
          console.log(err)
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
          <p>Duration: {mentorship.startDate} - {mentorship.endDate}</p>
          <p>Confirmed: {String(mentorship.confirmed)}</p>
          <p>Messages:</p> 
          { mentorship.messages.map(message => {
              return (<p>{message}</p>)
          })
        }
            {/* this.state.messages !== null ? 
          this.state.messages.map(message => {
              return (<p>{message}</p>)
          }) :  */}
         
          <form>
          
          <label htmlFor="message"></label>
          <input
            type="text"
            id="message"
            name="message"
            // value={this.state.messages}
            onChange={this.handleChange}
          />
          <button onClick={(event) => this.sendMessage(event, mentorship._id)}>Send message</button>
          </form>
        
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