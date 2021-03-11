import React, { Component } from 'react'
import axios from 'axios'
import MentorDetail from './MentorDetail'
import SearchBar from './SearchBar'

export default class MentorList extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  // preferredMentors: [],
  error: null,
  detailView: null,
  search: ''
}

componentDidMount() {
  this.getMentors();
}

getMentors = () => {
  axios.get(`/api/mentee/mentor-list`)
    .then(response => {
      //console.log(response)
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
    //console.log(this.props.user.preferredMentors)
    if (this.props.user.preferredMentors.includes(mentorId)) {
    // console.log(mentorId)
    // console.log(this.state.user._id)
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
  }

  setQuery = (name, value) => {
    //console.log(name, value, 'check values')
    this.setState({
        [name]: value
      });
  };

  filterMentors() {
    //console.log(this.state.allMentors, 'allMentors')
  return this.state.allMentors.filter((mentor) => {
      return (
      (mentor.username ? mentor.username.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentor.experience ? mentor.experience.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentor.industryExpertise ? mentor.industryExpertise.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentor.keySkills ? mentor.keySkills.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (mentor.availableFromDate ? mentor.availableFromDate.includes(this.state.search.toLowerCase()) : false)
      )
  });
  }


  render() {
    // console.log(this.props.user)
    // console.log(this.state)
    let showMentors;

    if (this.state.allMentors === null) {
      return <h3>Loading...</h3>
      
    } 
      
      const displayMentors = this.filterMentors();
      //console.log(displayMentors, 'checkMentors')
      if (displayMentors.length === 0) {
        showMentors = <p>No Mentors</p>
      } else {
        showMentors = displayMentors.map(mentor => {
          return (
            
            <div key = {mentor._id}>
            <img style = {{width: "200px"}} src={mentor.imgPath} alt="userPhoto"/>
            <h3>{mentor.username}</h3>
            <MentorDetail
              mentor = {mentor}
              {...this.props} 
            />
            <button onClick={() => {this.likeMentor(mentor._id)}}> {this.props.user.preferredMentors.includes(mentor._id) ? "Unlike" : "Like"} </button>
            </div>
          )
        })
      }


      return (
      
        <div>
          <h1>Mentor Overview</h1>
          <SearchBar
            setQuery={this.setQuery} 
            search={this.state.search}
          />
  
          {showMentors}
  
        </div>
      )
  
  }
}