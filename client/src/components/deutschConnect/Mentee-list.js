import React, { Component } from 'react'
import axios from 'axios'
import MenteeDetailDC from './Mentee-detail'
import SearchBarMentees from './SearchBarMentees'

export default class MenteeListDC extends Component {

state = {
  user: this.props.user,
  allMentees: null,
  error: null,
  search: ''
}

componentDidMount() {
  this.getMentees();
}

getMentees = () => {
  axios.get(`/api/deutschconnect/mentee-list`)
    .then(response => {
      console.log(response)
      this.setState({
        allMentees: response.data,
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
    this.setState(() => ({
        [name]: value
      }));
  };

filterMentees() {
return this.state.allMentees.filter((mentee) => {
    return (  
    mentee.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
    (mentee.firstName ? mentee.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.lastName ? mentee.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.requiredSupport ? mentee.requiredSupport.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.age ? mentee.age.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.nationality ? mentee.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.keyPersonalityTraits ? mentee.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    )
});
}


  render() {

    if (this.state.allMentees === null) {
      return <h3>Loading...</h3>  
    }
      const displayMentees = this.filterMentees();
      const showMentees = displayMentees.map(mentee => {
        return (
          
          <div key = {mentee._id}> 
          <img style = {{width: "200px"}} src={mentee.imgPath} alt="userPhoto"/>
          <h3>Username: {mentee.username}</h3>
          <h3>Name (first name, last name): {mentee.firstName}, {mentee.lastName}</h3>
          <MenteeDetailDC
            mentee = {mentee}
            {...this.props} 
          />
          </div>

        )
      })
    
    
    return (
      
      <div>
        <h1>Mentee Overview</h1>
        <SearchBarMentees 
          setQuery={this.setQuery} 
          search={this.state.search}
        />

        {showMentees}

      </div>

    )
  }
}