import React, { Component } from 'react'
import axios from 'axios'
import EditMentorship from './EditMentorship'
import SearchBarMentorships from './SearchBarMentorships'
import './DC.css';
//import { v4 as uuid } from "uuid";

export default class MentorshipOverview extends Component {
  state = {
    allMentorships: null,
    error: null,
    search: ''
  }

  componentDidMount() {
    this.getMentorships();
  }


  getMentorships = async () => {
    try {
      let request = await axios.get(`/api/deutschconnect/mentorships-overview`)
      let response = await request
      //console.log(response.data)
      this.setState({
        allMentorships: response.data
      })
  
      } catch(err) {
        console.log(err)
      }
    }
  
  setQuery = (name, value) => {
      this.setState(() => ({
          [name]: value
        }));
    };

    deleteMentorship = (event) => {
      //console.log('event:', event)
      axios.delete(`/api/deutschconnect/mentorships-overview/${event}`)
        .then( response => {
          //console.log('the response', response)
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
  
    handleSubmit = (event, mentorshipId, startDate, endDate) => {
      event.preventDefault();
      
      console.log('hello2', mentorshipId, startDate, endDate)

        axios.put(`/api/deutschconnect/mentorships-overview/${mentorshipId}`, {
          startDate: startDate,
          endDate: endDate
        })
        .then( response => {
          //console.log('frontend', response)

          this.state.allMentorships.map(m => {
            if (m._id === response.data._id){
              m.startDate = response.data.startDate
              m.endDate = response.data.endDate
              //console.log(m.startDate)
            }
            return;
        })
          this.props.history.push(`/deutschconnect/mentorships-overview/`)
        })
    }  

setQuery = (name, value) => {
  this.setState({
      [name]: value
    });
};
  
filterMentorships() {
if (this.state.allMentorships === null) {
  return [];
}
return this.state.allMentorships.filter((mentorship) => {
    return (
      (mentorship.mentor.username ? mentorship.mentor.username.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.mentor.firstName ? mentorship.mentor.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.mentor.lastName ? mentorship.mentor.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.mentee.username ? mentorship.mentee.username.toLowerCase().includes(this.state.search.toLowerCase()) : false)   ||
      (mentorship.mentee.firstName ? mentorship.mentee.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.mentee.lastName ? mentorship.mentee.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.startDate ? mentorship.startDate.includes(this.state.search.toLowerCase()) : false) ||
      (mentorship.endDate ? mentorship.endDate.includes(this.state.search.toLowerCase()) : false)
    )
});
}
  
render() {
  let mentorshipProfiles;
  if (this.state.allMentorships === null) {
    return <h3>Loading...</h3>
  } 
    //console.log('testtest', this.state.allMentorships )

  const displayMentorships = this.filterMentorships();
  //console.log(displayMentorships)
  if (displayMentorships.length === 0) {
    mentorshipProfiles = <p>No Mentorships yet, please create new</p>
  } else {
    mentorshipProfiles = displayMentorships.map((mentorship, index) => {
      //mentorship.id = uuid();
      return (
        <div key={index} className="mentorship-information">
          <div className="mentorship-information-category">Duration</div> <div className="mentorship-information-content">{mentorship.startDate} - {mentorship.endDate}</div>
          <div className="mentorship-information-category">Confirmed</div><div className="mentorship-information-content">{String(mentorship.confirmed)}</div>
          <br></br>
          <h3>Mentor</h3>
          <div className="mentorship-information-category">Name</div> <div className="mentorship-information-content">{mentorship.mentor.firstName} {mentorship.mentor.lastName}</div>
          <div className="mentorship-information-category">Username</div> <div className="mentorship-information-content">{mentorship.mentor.username}</div>
          <br></br>
          <h3>Mentee</h3>
          <div className="mentorship-information-category">Name</div> <div className="mentorship-information-content">{mentorship.mentee.firstName} {mentorship.mentee.lastName}</div>
          <div className="mentorship-information-category">Username</div> <div className="mentorship-information-category">{mentorship.mentee.username}</div>
          
          <EditMentorship
            user={this.props.user}
            mentorship = {mentorship}
            handleSubmit={this.handleSubmit}
            {...this.state}
          />
          <div className="button-container">
            <button className="form-button" onClick={() => {this.deleteMentorship(mentorship._id)}}>Delete</button>
          </div>
        </div>
        )
    })
  }
  
  
  
  return (
    <div className="body">
      <h1>Mentorships Overview</h1>
      <SearchBarMentorships
          setQuery={this.setQuery} 
          search={this.state.search}
      />
        {mentorshipProfiles}

    </div>
    )
  }
}