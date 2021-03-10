import React, { Component } from 'react'
import axios from 'axios'
import MentorDetailDC from './Mentor-detail'
import SearchBarMentors from './SearchBarMentors'

export default class MentorListDC extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  error: null,
  search: ''
}

componentDidMount() {
  this.getMentors();
}

getMentors = () => {
  axios.get(`/api/deutschconnect/mentor-list`)
    .then(response => {
      console.log(response)
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

setQuery = (name, value) => {
    console.log(name, value, 'check values')
    this.setState({
        [name]: value
      });
  };

filterMentors() {

return this.state.allMentors.filter((mentor) => {
    console.log(mentor.availableForNewMentorship, 'check Mentor')
    return (
    String(mentor.activelyMentoring).toLowerCase().includes(this.state.search.toLowerCase()) ||
    String(mentor.availableForNewMentorship).toLowerCase().includes(this.state.search.toLowerCase()) ||
    (mentor.username ? mentor.username.toLowerCase().includes(this.state.search.toLowerCase()) : false)   ||
    (mentor.firstName ? mentor.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentor.lastName ? mentor.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentor.age ? String(mentor.age).includes(this.state.search.toLowerCase()) : false) ||
    (mentor.nationality ? mentor.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentor.experience ? mentor.experience.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentor.industryExpertise ? mentor.industryExpertise.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentor.keySkills ? mentor.keySkills.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentor.keyPersonalityTraits ? mentor.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentor.availableFromDate ? mentor.availableFromDate.includes(this.state.search.toLowerCase()) : false)
    )
});
}

deleteMentor = (event) => {
  console.log('event:', event)
  axios.delete(`/api/deutschconnect/mentor-list/${event}`)
    .then( response => {
      console.log('the response', response)

      //filter doesnt mutate the state
     
      this.setState({
        allMentors: this.state.allMentors.filter( m => m._id !== response.data._id )
      })
      

      this.props.history.push('/deutschconnect/mentor-list')
    })
    .catch(err => {
      console.log(err)
    })
}

  render() {

    console.log('checkState', this.state)

    if (this.state.allMentors === null) {
      return <h3>Loading...</h3>  
    }
      const displayMentors = this.filterMentors();
      //console.log('after filtered', displayMentors)
      const showMentors = displayMentors.map(mentor => {
        return (
          
          <div key = {mentor._id}> 
          <img style = {{width: "200px"}} src={mentor.imgPath} alt="userPhoto"/>
          <h3>Username: {mentor.username}</h3>
          <h3>Name (first name, last name): {mentor.firstName}, {mentor.lastName}</h3>
          <button onClick={() => {this.deleteMentor(mentor._id)}}>Delete Mentor and corresponding Mentorships from Database</button>
          <MentorDetailDC
            mentor = {mentor}
            {...this.props} 
          />
          </div>

        )
      })
    
    
    return (
      
      <div>
        <h1>Mentor Overview</h1>
        <SearchBarMentors 
          setQuery={this.setQuery} 
          search={this.state.search}
        />

        {showMentors}

      </div>

    )
  }
}