import React, { Component } from 'react'
import axios from 'axios'
import './DC.css';

export default class CreateNewMentorshipID extends Component {
  
  state = {
    mentorProfiles:'',
    mentor: '',
    menteeProfiles: '',
    mentee: '',
    startDate: '',
    endDate: '',
    confirmed: true 
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
    //console.log(this.props.location.state.mentee)
   
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
            return <option key={index} value={menteeProfile._id}>{menteeProfile.username}</option>
      })
    }
   
    const preferred = this.props.location.state.mentee.preferredMentors.map( (mentor, index) => {
      return (
          <div key={mentor._id}>
            <p className="num"> {index+1}. </p>
            <div className="mentorship-information-category">Username </div><div className="mentorship-information-content">{mentor.username}</div>
            <div className="mentorship-information-category">First Name</div> <div className="mentorship-information-content">{mentor.firstName}</div>
            <div className="mentorship-information-category">Last Name</div> <div className="mentorship-information-content">{mentor.lastName}</div>
            <p>----</p>
          </div>
      )
    })

    return (
      
      <div className="body mentorship-information">
        <h3>Create New Mentorship For Mentee</h3>
        <div>
            <div className="mentorship-information-category">Username </div><div className="mentorship-information-content">{this.props.location.state.mentee.username}</div>
            <div className="mentorship-information-category">First Name</div> <div className="mentorship-information-content">{this.props.location.state.mentee.firstName}</div>
            <div className="mentorship-information-category">Last Name</div> <div className="mentorship-information-content">{this.props.location.state.mentee.lastName}</div>
          
            <div className="mentors-preferred">
          
                <h3>Preferred Mentors</h3>
                {preferred}
            </div>
          <div className="body">
            <form className="profile-information" onSubmit={this.handleSubmit}>
                <label className="profile-information-category"  htmlFor="mentor">Mentor</label>
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
      </div>
    )
  }
}