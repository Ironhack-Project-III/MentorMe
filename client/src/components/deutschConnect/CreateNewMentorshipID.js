import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNewMentorshipID extends Component {
  
  state = {
    mentorProfiles:'',
    mentor: '',
    menteeProfiles: '',
    mentee: '',
    startDate: '',
    endDate: '',
    confirmed: true,
    
  }

  componentDidMount() {
    this.getData();
  }
  
  getData = async () => {
    try {
      let request = await axios.get(`/api/deutschconnect/mentorship-create`)
      let response = await request

      this.setState({
        mentorProfiles: response.data.mentors,
        menteeProfiles: response.data.mentees
      })

      } catch(err) {
        console.log(err)
      }
    }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(name, value, "name&value at hadnleChange")
    this.setState({ 
        [name]: value 
    });
  };

handleSubmit = (event) => {
    event.preventDefault();
    const {
      mentor,
      mentee,
      startDate,
      endDate,
      confirmed
    } = this.state;
//console.log("post request at FE")
    axios
        .post('/api/deutschconnect/mentorship-create', {
          mentor,
          mentee,
          startDate,
          endDate,
          confirmed
        })
        .then((response) => {
         // console.log(response, 'this is a response')
          //this.props.setUser(response.data)
          //redirect to profile
         
          this.props.history.push('/deutschconnect/mentorships-overview')
        })
        .catch((err) => console.log(err));
};
  
  render() {
    let mentorOptions;
    let menteeOptions;
    console.log(this.props.location.state.mentee)
   
    if (this.state.mentorProfiles=== '' || this.state.menteeProfiles=== '') {
      return <h3>Loading...</h3>
    } else {
    //  console.log(this.state.mentorProfiles)
      mentorOptions = this.state.mentorProfiles.map((mentor, index) => {
       // mentor.id = uuid();
        return <option key={index} value={mentor._id}>{mentor.username}</option>
      })
    //  console.log(this.state.menteeProfiles)
      menteeOptions = this.state.menteeProfiles.map((menteeProfile, index) => {
        //mentee.id = uuid();
        
          if (menteeProfile._id === this.props.location.state.mentee._id) {
            return <option key={index} value={this.props.location.state.mentee._id} selected>{this.props.location.state.mentee.username}</option>
          } else {
            return <option key={index} value={menteeProfile._id}>{menteeProfile.username}</option>
          }
       
      })
    }
   
    const preferred = this.props.location.state.mentee.preferredMentors.map( (mentor, index) => {
      return (
          <div key={mentor._id}>
            <p> {index+1}.: </p>
            <p>Username: {mentor.username}</p>
            <p>First Name: {mentor.firstName}</p>
            <p>Last Name: {mentor.lastName}</p>
          </div>
      )
    })

    return (
      
      <div>
        <h1>Create New Mentorship</h1>
        
        <h2>Mentee:</h2>
          <p>Username:{this.props.location.state.mentee.username}</p>
          <p>First Name:{this.props.location.state.mentee.firstName}</p>  
          <p>Last Name:{this.props.location.state.mentee.lastName}</p>  
        <h2>Preferred Mentors by Mentee:</h2>
        {preferred}
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="mentor">Mentor:</label>
        <select 
            name="mentor"
            id="mentor"
            onChange={this.handleChange}
            >
            <option></option>
            {mentorOptions}
        </select>

        <label htmlFor="mentee">Mentee:</label>
        <select 
            name="mentee"
            id="mentee"
            onChange={this.handleChange}
            >
            <option></option>
            {menteeOptions}
        </select>
        <label htmlFor="startDate">Start Date:</label>
        <input
            name="startDate"
            type="date"
            value={this.state.startDate}
            onChange={this.handleChange}
            id="startDate"
        />
        <label htmlFor="endDate">End Date:</label>
        <input
            name="endDate"
            type="date"
            value={this.state.endDate}
            onChange={this.handleChange}
            id="endDate"
        />
        <button type="submit">Confirm New Mentorship</button>
        </form>
      </div>
    )
  }
}