import React, { Component } from 'react'
import axios from 'axios'
import MenteeDetailDC from './Mentee-detail'
import SearchBarMentees from './SearchBarMentees'

export default class MenteeListDC extends Component {

state = {
  user: this.props.user,
  allMentees: '',
  allMentorships: '',
  error: null,
  search: '',
  notMatchedMentees: null,
  matchedMentees: null
}

componentDidMount() {
  this.getData();
}

  
getData = async () => {
  try {
    let request = await axios.get(`/api/deutschconnect/mentee-list`)
    let response = await request
    console.log(response.data)
    this.setState({
      allMentees: response.data.mentees,
      allMentorships: response.data.mentorships
    })

    this.checkNotMatchedMentees()

    } catch(err) {
      console.log(err)
    }
  }

setQuery = (name, value) => {
    this.setState(() => ({
        [name]: value
      }));
  };

checkNotMatchedMentees () {
  if (this.state.allMentorships === '') {
    return <h3>Loading...</h3>  
  } else {
    let helperArray1 = []
    this.state.allMentorships.map( (mentorship) => {
      this.state.allMentees.map ( (mentee) => {
        if (mentorship.mentee._id === mentee._id) {
          helperArray1.push(mentee._id)
          this.setState({
            matchedMentees: helperArray1
          })
        }

      })
    })
    
  }
    

    let helperArray2 = []
    this.state.allMentees.map( (mentee) => {
      if (!this.state.matchedMentees.includes(mentee._id)) {
        helperArray2.push(mentee)
        this.setState({
          notMatchedMentees: helperArray2
        })
      }
    })

    console.log('notmatched', this.state.matchedMentees, 'matched', this.state.notMatchedMentees)
}

filterMentees() {

return this.state.allMentees.filter((mentee) => {
    return (  
    mentee.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
    (mentee.firstName ? mentee.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.lastName ? mentee.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.requiredSupport ? mentee.requiredSupport.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.age ? mentee.age.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
    (mentee.nationality ? mentee.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.keyPersonalityTraits ? mentee.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.businessName ? mentee.businessName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.businessDescription ? mentee.businessDescription.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.yearsOfOperation ? mentee.yearsOfOperation.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.website ? mentee.website.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (mentee.sector ? mentee.sector.toLowerCase().includes(this.state.search.toLowerCase()) : false) 
    )
});
}


  render() {

    let showMentees;
    if (this.state.allMentees === '' || this.state.allMentorships === '') {
      return <h3>Loading...</h3>  
    } else {
          const displayMentees = this.filterMentees();
          showMentees = displayMentees.map(mentee => {
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
    }

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