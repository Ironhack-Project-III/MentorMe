import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
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
  matchedMentees: null,
  checkBox: false
}

componentDidMount() {
  this.getData();
}

  
getData = async () => {
  try {
    let request = await axios.get(`/api/deutschconnect/mentee-list`)
    let response = await request
    //console.log(response.data)
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
        //console.log('matched', this.state.matchedMentees)
        return;
      })
    })
    
    if (this.state.matchedMentees !== null) {
      let helperArray2 = []
      
      this.state.allMentees.map( (mentee) => {
        if (!this.state.matchedMentees.includes(mentee._id)) {
          helperArray2.push(mentee)
          this.setState({
            notMatchedMentees: helperArray2
          })
        }
        //console.log('not matched', this.state.notMatchedMentees)
        return;
      })
    }

  }

    //console.log('notmatched', this.state.matchedMentees, 'matched', this.state.notMatchedMentees)
}
//this.state.matchedMentees !== null || this.state.notMatchedMentees !== null)
filterMentees() {
    if (this.state.checkBox !== true && this.state.allMentees !== '') {
      //console.log('The mentees', this.state.allMentees)
      return this.state.allMentees.filter((mentee) => {
        return (  
        mentee.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
        (mentee.firstName ? mentee.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.lastName ? mentee.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.age ? String(mentee.age).includes(this.state.search.toLowerCase()) : false) ||
        (mentee.requiredSupport ? mentee.requiredSupport.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.nationality ? mentee.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.keyPersonalityTraits ? mentee.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.businessName ? mentee.businessName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.businessDescription ? mentee.businessDescription.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.yearsOfOperation ? mentee.yearsOfOperation.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.website ? mentee.website.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.sector ? mentee.sector.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.availableFromDate ? mentee.availableFromDate.includes(this.state.search.toLowerCase()) : false)
        )
      });
    }
  
    if (this.state.checkBox === true && this.state.notMatchedMentees !== null && this.state.allMentees !== '') {
      return this.state.notMatchedMentees.filter((mentee) => {
        return (  
        mentee.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
        (mentee.firstName ? mentee.firstName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.lastName ? mentee.lastName.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.age ? String(mentee.age).includes(this.state.search.toLowerCase()) : false) ||
        (mentee.requiredSupport ? mentee.requiredSupport.toLowerCase().includes(this.state.search.toLowerCase()) : false) || 
        (mentee.nationality ? mentee.nationality.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.keyPersonalityTraits ? mentee.keyPersonalityTraits.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.businessName ? mentee.businessName.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.businessDescription ? mentee.businessDescription.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.yearsOfOperation ? mentee.yearsOfOperation.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.website ? mentee.website.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.sector ? mentee.sector.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
        (mentee.availableFromDate ? mentee.availableFromDate.includes(this.state.search.toLowerCase()) : false)
        )
      });
    }
    
    return null;
}
deleteMentee = (event) => {
  //console.log('event:', event)
  axios.delete(`/api/deutschconnect/mentee-list/${event}`)
    .then( response => {
      //console.log('the response', response)
      // we want to redirect to the projects list

      //filter doesnt mutate the state
      this.setState({
        allMentees: this.state.allMentees.filter( m => m._id !== response.data._id )
      })
      this.props.history.push('/deutschconnect/mentee-list')
    })
    .catch(err => {
      console.log(err)
    })
}


  render() {

    let showMentees;
    if (this.state.allMentees === '' || this.state.allMentorships === '') {
      return <h3>Loading...</h3>  
    } else {
          const displayMentees = this.filterMentees();
          //console.log('test', displayMentees)
          if (displayMentees.length === 0) {
            showMentees = <p>No Mentees</p>
          } else {
            showMentees = displayMentees.map(mentee => {
              return (
                
                <div key = {mentee._id}> 
                <img style = {{width: "200px"}} src={mentee.imgPath} alt="userPhoto"/>
                <h3>Username: {mentee.username}</h3>
                <h3>Name (first name, last name): {mentee.firstName}, {mentee.lastName}</h3>
                <Link to={{
                  pathname: `/deutschconnect/mentorship-create/${mentee._id}`,
                  state: {
                    mentee: mentee
                  }
                  }}>
                Create Mentorship for Mentee
                </Link>
                <button onClick={() => {this.deleteMentee(mentee._id)}}>Delete Mentee and corresponding Mentorships from Database</button>
                <MenteeDetailDC
                  mentee = {mentee}
                  {...this.props} 
                />
                </div>
              )
            })
          }
    }

    return (
      
      <div>
        <h1>Mentee Overview</h1>
        <SearchBarMentees 
          setQuery={this.setQuery} 
          search={this.state.search}
          checkBox={this.state.checkBox}
        />

        {showMentees}

      </div>

    )
  }
}