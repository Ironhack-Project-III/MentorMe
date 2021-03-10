import React, { Component } from 'react'
import axios from 'axios'
import EditMentorship from './EditMentorship'
import SearchBarMentorships from './SearchBarMentorships'
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
      console.log(response.data)
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
  
    handleSubmit = (event, mentorshipId, startDate, endDate) => {
      event.preventDefault();
      
      console.log('hello2', mentorshipId, startDate, endDate)

        axios.put(`/api/deutschconnect/mentorships-overview/${mentorshipId}`, {
          startDate: startDate,
          endDate: endDate
        })
        .then( response => {
          console.log('frontend', response)

          this.state.allMentorships.map(m => {
            if (m._id === response.data._id){
              m.startDate = response.data.startDate
              m.endDate = response.data.endDate
              console.log(m.startDate)
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
  } else {
    console.log('testtest', this.state.allMentorships )

    const displayMentorships = this.filterMentorships();

    mentorshipProfiles = displayMentorships.map((mentorship, index) => {
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
      <SearchBarMentorships
          setQuery={this.setQuery} 
          search={this.state.search}
      />
        {mentorshipProfiles}

    </div>
    )
  }
}