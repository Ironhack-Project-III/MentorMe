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
    user: this.props.user._id,
    detailView: false
  }
 
  componentDidMount() {
    this.getMentorships();
  }
  
  getMentorships = () => {
    axios.get(`/api/mentor/my-mentorship/${this.props.user._id}`)
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

      axios.put(`/api/mentor/my-mentorship/${mentorshipId}`, {
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
    return <h2>Loading...</h2>
  } 
    mentorshipProfiles = this.state.allMentorships.map((mentorship, index) => {
      //mentorship.id = uuid();
      return (
        <div className="mentorship-information">   
        
           
        <div key={index}>
          
         <div className="mentorship-information-category">  Duration: </div>  <div className="mentorship-information-content"> {mentorship.startDate} - {mentorship.endDate} </div>
         <div className="mentorship-information-category">  Confirmed: </div> <div className="mentorship-information-content"> {String(mentorship.confirmed)} </div>
          <br></br>
          <h3>Mentee</h3>
         <div className="mentorship-information-category">  Name: </div> <div className="mentorship-information-content">  {mentorship.mentee.firstName} {mentorship.mentee.lastName} </div>
         <div className="mentorship-information-category">  Username: </div> <div className="mentorship-information-content"> {mentorship.mentee.username} </div>
         <div className="mentorship-information-category">  Contact Details: </div> <div className="mentorship-information-content"> {mentorship.mentee.contactDetails} </div>
         <div className="mentorship-information-category">  Required Support: </div> <div className="mentorship-information-content"> {mentorship.mentee.requiredSupport} </div>
         <div className="mentorship-information-category">  Business Name: </div> <div className="mentorship-information-content"> {mentorship.mentee.businessName} </div>
         <div className="mentorship-information-category">  Business Description: </div> <div className="mentorship-information-content"> {mentorship.mentee.businessDescription} </div>
         <div className="mentorship-information-category">  Years Of Operation Of Business: </div> <div className="mentorship-information-content"> {mentorship.mentee.yearsOfOperation} </div>
         <div className="mentorship-information-category">  Website: </div> <div className="mentorship-information-content"> {mentorship.mentee.website} </div>
         <div className="mentorship-information-category">  Sector: </div> <div className="mentorship-information-content"> {mentorship.mentee.sector} </div>
          <br></br>
          <h3>You</h3>
          <div className="mentorship-information-category"> Name:</div> {mentorship.mentor.firstName} <div className="mentorship-information-content"> {mentorship.mentor.lastName} </div>
          <div className="mentorship-information-category"> Username:</div> <div className="mentorship-information-content"> {mentorship.mentor.username} </div>
          <div className="mentorship-information-category"> Contact Details:</div> <div className="mentorship-information-content"> {mentorship.mentor.contactDetails} </div>
          <div className="mentorship-information-category"> Experience:</div> {mentorship.mentor.experience} </div>
          <div className="mentorship-information-category"> Industry Expertise:</div> <div className="mentorship-information-content"> {mentorship.mentor.industryExpertise} </div>
          <div className="mentorship-information-category"> Key Skills:</div> <div className="mentorship-information-content"> {mentorship.mentor.keySkills} </div>
          <br></br>
          <div className="button-container">
          <button className = "form-button"  onClick={this.detailView}>Messaging</button>
          </div>

        {this.state.detailView && (
          <div>
            <h3>Chat</h3>
            <div className="message-container">
              { mentorship.messages.map(message => {
                return message.author === this.state.user 
                ? 
                <div className="message-content-container-me"> <p className="message-me">{`You: ${message.message}`}</p>  </div>
                :  
                <div className="message-content-container-you"> <p className="message-you">{`Mentee: ${message.message}`}</p>  </div>
                
                ;
                })
              }
            
                 

            </div>
            <form onSubmit={this.sendMessage}>
            
            <label  htmlFor="message"></label>
            <input
              className = "profile-information-content-update"
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
            <div className="button-container">
            <button className = "form-button" type="submit" onClick ={(() =>{this.handleShitter(mentorship._id, this.props.user._id)})}> Send </button>
            </div>
            </form>
          </div>
        )}

          
          </div>

        
        )
    })

    //console.log(mentorshipProfiles)
    if (mentorshipProfiles.length === 0) {
      mentorshipProfiles = <p>No Mentorship yet</p>
    }
  
  
  return (
    <div className="body">
      
      <h1>Mentorship Overview</h1>

        {mentorshipProfiles}

    </div>
    )
  }
}