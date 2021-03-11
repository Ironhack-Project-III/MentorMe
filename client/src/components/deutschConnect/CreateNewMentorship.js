import React, { Component } from 'react'
import axios from 'axios'
import './DC.css'

export default class CreateNewMentorship extends Component {
  
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
   
    if (this.state.mentorProfiles=== '' || this.state.menteeProfiles=== '') {
      return <h3>Loading...</h3>
    } else {
    //  console.log(this.state.mentorProfiles)
      mentorOptions = this.state.mentorProfiles.map((mentor, index) => {
       // mentor.id = uuid();
        return <option key={index} value={mentor._id}>{mentor.username}</option>
      })
    //  console.log(this.state.menteeProfiles)
      menteeOptions = this.state.menteeProfiles.map((mentee, index) => {
        //mentee.id = uuid();
        return <option key={index} value={mentee._id}>{mentee.username}</option>
      })
    }
   
    // const mentorRole = this.state.mentor.map(mentor => mentor.role) //this is not a function, why?
    // {console.log('MentorYes', mentorRole)} //cannot use .firstName, why? //parse whole profile?
    //how can I best get all mentors in select and save them back as selected?+
    return (
      
      <div className="body mentorship-information">
        <h1>Create New Mentorship</h1>
        
        <div className="body">
          <form className="profile-information" onSubmit={this.handleSubmit}>
          <label className="profile-information-category" htmlFor="mentor">Mentor</label>
          <select className="profile-information-content-update"
              name="mentor"
              id="mentor"
              onChange={this.handleChange}
              >
              <option></option>
              {mentorOptions}
          </select>
          <label className="profile-information-category" htmlFor="mentee">Mentee</label>
          <select className="profile-information-content-update"
              name="mentee"
              id="mentee"
              onChange={this.handleChange}
              >
              <option></option>
              {menteeOptions}
          </select>
          <label className="profile-information-category" htmlFor="startDate">Start Date</label>
          <input className="profile-information-content-update"
              name="startDate"
              type="date"
              value={this.state.startDate}
              onChange={this.handleChange}
              id="startDate"
          />
          <label className="profile-information-category" htmlFor="endDate">End Date</label>
          <input className="profile-information-content-update"
              name="endDate"
              type="date"
              value={this.state.endDate}
              onChange={this.handleChange}
              id="endDate"
          />
            <div className="button-container">
              <button className="form-button" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}