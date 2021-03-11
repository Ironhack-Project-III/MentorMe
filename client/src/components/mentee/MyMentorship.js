import React, { Component } from 'react'
import axios from 'axios'
//import { v4 as uuid } from "uuid";

export default class MyMentorship extends Component {

  
  state = {
    allMentorships: null,
    // messages: [],
    editForm: false,
    message: "",
    error: null,
    mentorshipId:"",
    authorId: "",
    user: this.props.user._id,
    detailView: false
  }
 
  componentDidMount() {
    this.getMentorships();
  }
  
  getMentorships = () => {
    axios.get(`/api/mentee/my-mentorship/${this.props.user._id}`)
      .then(response => {
        //console.log(response, 'the response')
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
      
      //console.log(event.target)
      const target = event.target;
      const name = target.name;
      const value = target.value
      this.setState({
        [name]: value
      })
      //console.log('Step1', this.state.message)
    }
  
    sendMessage = (e) => {
      e.preventDefault()
      let mentorshipId = this.state.mentorshipId

      axios.put(`/api/mentee/my-mentorship/${mentorshipId}`, {
        // mentor: this.state
        newMessage: this.state.message,
        author: this.state.authorId
      })
        .then(response => {
          //console.log(response, "this hsoudl onlz be all m,entorships")
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
         this.props.history.push('/mentee/my-mentorship')
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

    detailView = () => {
      this.setState((prevState) => ({
        detailView: !prevState.detailView
      }))
    }
  
    setQuery = (name, value) => {
      this.setState({
          [name]: value
        });
    };
  
render() {
  let mentorshipProfiles;

  if (this.state.allMentorships === null) {
    return <h3>Loading...</h3>
  }


    //console.log(this.props.user._id)
    mentorshipProfiles = this.state.allMentorships.map((mentorship, index) => {
      return (
        
        <div key={index}>
          <p>-------</p>
          <p>Duration: {mentorship.startDate} - {mentorship.endDate}</p>
          <p>Confirmed: {String(mentorship.confirmed)}</p>
          <br></br>
          <h2>Mentor:</h2>
          <p>Name: {mentorship.mentor.firstName} {mentorship.mentor.lastName}</p>
          <p>Username: {mentorship.mentor.username}</p>
          <p>Contact Details: {mentorship.mentor.contactDetails}</p>
          <p>Experience: {mentorship.mentor.experience}</p>
          <p>Industry Expertise: {mentorship.mentor.industryExpertise}</p>
          <p>Key Skills: {mentorship.mentor.keySkills}</p>
          <br></br>
          <h2>You (Mentee):</h2>
          <p>Name: {mentorship.mentee.firstName} {mentorship.mentee.lastName}</p>
          <p>Username: {mentorship.mentee.username}</p>
          <p>Contact Details: {mentorship.mentee.contactDetails}</p>
          <p>Required Support: {mentorship.mentee.requiredSupport}</p>
          <p>Business Name: {mentorship.mentee.businessName}</p>
          <p>Business Description: {mentorship.mentee.businessDescription}</p>
          <p>Years Of Operation Of Business: {mentorship.mentee.yearsOfOperation}</p>
          <p>Website: {mentorship.mentee.website}</p>
          <p>Sector: {mentorship.mentee.sector}</p>
          <br></br>

          <button onClick={this.detailView}>See Or Send Messages</button>
          
          {this.state.detailView && (              
              <div>
                <h2>Messages:</h2>
                { mentorship.messages.map(message => {
                    return message.author === this.state.user ?  <p>{`You: ${message.message}`}</p> :  <p>{`Mentor: ${message.message}`}</p>;
                  })
                }

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
          )}

            <p>-------</p>
          </div>
          
      )
    })

    //console.log(mentorshipProfiles)
    if (mentorshipProfiles.length === 0) {
      mentorshipProfiles = <p>No mentorship yet</p>
    }
  
  return (
    <div>
      <h1>Mentorship Overview</h1>

        {mentorshipProfiles}

    </div>
    )
  }
}