import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNewMentorship extends Component {
  
  state = {
    mentor: '',
    mentee: '',
    startDate: '',
    endDate: '',
    confirmed: true
  }

  componentDidMount() {
    this.getData();
  }
  
  getData = () => {
    axios.get(`/api/deutschconnect/mentorship-create`)
      .then(response => {
        console.log(response.data.mentors)

        const mentorArray = response.data.mentors.map(mentor => mentor)
        console.log(mentorArray[0])

        this.setState({
          mentor: mentorArray
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

    axios
        .post('/deutschconnect/mentorship-create', {
          mentor,
          mentee,
          startDate,
          endDate,
          confirmed
        })
        .then((response) => {
          this.props.setUser(response.data)
          //redirect to profile
          this.props.history.push('/deutschconnect/mentorships-overview')
        })
        .catch((err) => console.log(err));
};
  
  render() {
    if (this.state.mentor=== null) {
      return <h3>Loading...</h3>
    }

    // const mentorRole = this.state.mentor.map(mentor => mentor.role) //this is not a function, why?
    // {console.log('MentorYes', mentorRole)} //cannot use .firstName, why? //parse whole profile?
    //how can I best get all mentors in select and save them back as selected?
    return (
      
      <div>
        <h1>Create New Mentorship</h1>
        
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
            name="startDate"
            type="date"
            value={this.state.startDate}
            onChange={this.handleChange}
            id="startDate"
        />
        <button type="submit">Confirm New Mentorship</button>
        </form>
      </div>
    )
  }
}