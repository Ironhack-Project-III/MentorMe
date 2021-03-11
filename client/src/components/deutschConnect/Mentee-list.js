import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import MenteeDetailDC from './Mentee-detail'
import SearchBarMentees from './SearchBarMentees'
import './DC.css';

export default class MenteeListDC extends Component {

state = {
  user: this.props.user,
  allMentees: '',
  allMentorships: '',
  error: null,
  search: '',
  notMatchedMentees: '',
  matchedMentees: '',
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
    let helperArray2 = []   
      
      this.state.allMentees.map( (mentee) => {
        if (this.state.matchedMentees === '') {
          helperArray2.push(mentee)
          this.setState({
            notMatchedMentees: helperArray2
          })
        }
        if (this.state.matchedMentees !== '') {
          if (this.state.matchedMentees.includes(mentee._id) === false) {
            helperArray2.push(mentee)
            this.setState({
              notMatchedMentees: helperArray2
            })
          }
        }

        //console.log('not matched', this.state.notMatchedMentees)
        return;
      })
  }

    //console.log('notmatched', this.state.matchedMentees, 'matched', this.state.notMatchedMentees)
}

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
  
    if (this.state.checkBox === true && this.state.notMatchedMentees !== '' && this.state.allMentees !== '') {
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
    
    return [];
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
          if (displayMentees.length <= 0) {
            showMentees = <p>No Mentees</p>
          } else {
            showMentees = displayMentees.map(mentee => {
              return (
                
                <div key = {mentee._id} className="mentorship-information"> 
                  <img className="profile-picture" style={{alignSelf:"center"}} src={mentee.imgPath} alt="userPhoto"/>
                  <br></br>
                  <div className="mentorship-information-category">Username</div> <div className="mentorship-information-content">{mentee.username}</div>
                  <div className="mentorship-information-category">Name (first name, last name)</div> <div className="mentorship-information-content">{mentee.firstName}, {mentee.lastName}</div>
                  <div className="button-container">
                    <Link to={{
                      pathname: `/deutschconnect/mentorship-create/${mentee._id}`,
                      state: {
                        mentee: mentee
                      }
                      }}
                      className="button button-text"
                    >
                    Match Mentor
                    </Link>
                  </div>
                 
                  <MenteeDetailDC
                    mentee = {mentee}
                    {...this.props} 
                  />
                  <div className="button-container">
                    <button className="form-button" style={{width:"200px"}} onClick={() => {this.deleteMentee(mentee._id)}}>Delete Mentee and its Mentorships</button>
                  </div>
                </div>
              )
            })
          }
    }

    return (
      
      <div className="body">
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