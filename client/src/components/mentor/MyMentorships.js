import React, { Component } from 'react'
import axios from 'axios'
//import { v4 as uuid } from "uuid";

export default class MyMentorships extends Component {

  
  state = {
    allMentorships: null,
    // messages: [],
    editForm: false,
    message: "",
    error: null,
    mentorshipId:"",
    authorId: "",
    user: this.props.user._id
  }
 
  componentDidMount() {
    this.getMentorships();
  }
  
  getMentorships = () => {
    axios.get(`/api/mentor/my-mentorship/${this.props.user._id}`)
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

    handleChange = (event) => {
      
      console.log(event.target)
      const target = event.target;
      const name = target.name;
      const value = target.value
      this.setState({
        [name]: value
      })
      console.log('Step1', this.state.message)
    }
  
    sendMessage = (e) => {
      e.preventDefault()
      let mentorshipId = this.state.mentorshipId

      axios.put(`/api/mentor/my-mentorship/${mentorshipId}`, {
        // mentor: this.state
        newMessage: this.state.message,
        author: this.state.authorId
      })
        .then(response => {
          console.log(response, "this hsoudl onlz be all m,entorships")
          this.setState({
            allMentorships: response.data,
            message: ""
          })
          // this.state.allMentorships.map(m => {
          //   if (m._id === response.data._id){
          //     m.messages = response.data.messages 
          //     console.log('old messages', m.messages)
          //     console.log('updated messages', response.data.messages)
          //   }
        // })
         this.props.history.push('/mentor/my-mentorships')
        })
        .catch(err => {
          console.log(err)
        })
    }
    handleShitter = (mentorID, authorId) => {
      this.setState({
        mentorshipId: mentorID,
        authorId: authorId
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

            {/* return <p>{message.message}</p>  */}

            return message.author === this.state.user ?  <p>{`You: ${message.message}`}</p> :  <p>{`Mentee: ${message.message}`}</p>;

          })
        }
            {/* this.state.messages !== null ? 
          this.state.messages.map(message => {
              return (<p>{message}</p>)
          }) :  */}
         
          <form onSubmit={this.sendMessage}>
          
          <label htmlFor="message"></label>
          <input
            type="text"
            id="message"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <input
          type="mentorship"
          id="mentorship"
          value={mentorship._id} 
          style={{display: "none"}}
          />
          <button type="submit" onClick ={(() =>{this.handleShitter(mentorship._id, this.props.user._id)})}> Send message</button>
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