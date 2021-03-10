import React, { Component } from 'react'
import axios from 'axios'
import MentorDetailDC from './Mentor-detail'
import SearchBarMentors from './SearchBarMentors'

export default class MentorListDC extends Component {

state = {
  user: this.props.user,
  allMentors: null,
  error: null,
  search: '',
  availableCheckBox: false,
  activeCheckBox: false
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
    //(this.state.activeCheckBox ? mentor.activelyMentoring : true) &&
    (this.state.availableCheckBox ? mentor.availableForNewMentorship: true) &&
    mentor.username.toLowerCase().includes(this.state.search.toLowerCase()) || 
    (mentor.firstName ? mentor.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    // (mentor.lastName ? mentor.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    // (mentor.age ? mentor.age.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    // (mentor.nationality ? mentor.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    // (mentor.experience ? mentor.experience.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    // (mentor.industryExpertise ? mentor.industryExpertise.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    // (mentor.keySkills ? mentor.keySkills.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    // (mentor.keyPersonalityTraits ? mentor.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    )
});
}


  render() {

    console.log('checkState', this.state)

    if (this.state.allMentors === null) {
      return <h3>Loading...</h3>  
    }
      const displayMentors = this.filterMentors();
      const showMentors = displayMentors.map(mentor => {
        return (
          
          <div key = {mentor._id}> 
          <img style = {{width: "200px"}} src={mentor.imgPath} alt="userPhoto"/>
          <h3>Username: {mentor.username}</h3>
          <h3>Name (first name, last name): {mentor.firstName}, {mentor.lastName}</h3>
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
          availableCheckBox={this.state.availableCheckBox}
          activeCheckBox={this.state.activeCheckBox}
        />

        {showMentors}

      </div>

    )
  }
}