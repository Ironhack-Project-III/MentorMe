import React, { Component } from 'react'
import axios from 'axios'
import service from '../../services/cloudinary'


export default class EditMentorProfile extends Component {

  state = {
    mentorProfile: this.props.user,
    nameHeader: this.props.user.firstName,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    age: this.props.user.age,
    nationality: this.props.user.nationality,
    contactDetails: this.props.user.contactDetails,
    experience: this.props.user.experience,
    industryExpertise: this.props.user.industryExpertise,
    keySkills: this.props.user.keySkills,
    keyPersonalityTraits: this.props.user.keyPersonalityTraits,
    availableForNewMentorship: this.props.user.availableForNewMentorship,
    activelyMentoring: this.props.user.activelyMentoring,
    availableFromDate: this.props.user.availableFromDate,
    imgPath: this.props.user.imgPath
  }

 
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    })
    //console.log('Step1', this.state)
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.put(`/api/mentor/profile/${this.state.mentorProfile._id}/edit`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      nationality: this.state.nationality,
      contactDetails: this.state.contactDetails,
      experience: this.state.experience,
      industryExpertise: this.state.industryExpertise,
      keySkills: this.state.keySkills,
      keyPersonalityTraits: this.state.keyPersonalityTraits,
      availableForNewMentorship: this.state.availableForNewMentorship,
      activelyMentoring: this.state.activelyMentoring,
      availableFromDate: this.state.availableFromDate,
      imgPath: this.props.imgPath
    })
      .then(response => {

        //update usersession with updated data to get it without the need of refreshing the browser window
       this.props.setUser(response.data)
        //redirect to profile
       this.props.history.push(`/mentor/profile/${response.data._id}`)

      })
      .catch(err => {
        console.log(err)
      })
  }

    handleChangeUpload = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    handleFileUpload = e => {
      //console.log('The file to be uploaded is: ', e.target.files[0]);
  
      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append('imgPath', e.target.files[0]);
  
      service
        .handleUpload(uploadData)
        .then(response => {
          //console.log(response.secure_url)
          // console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state
          this.setState({ imgPath: response.secure_url });
          //console.log(this.state)
        })
        .catch(err => {
          console.log('Error while uploading the file: ', err);
        });
    };


  render() {
    
    return (
      

      <div className="body">
      
        <h3 className = "top">Edit Your Profile</h3>
        
        <form className="profile-information" onSubmit={this.handleSubmit}>

          <label className="profile-information-category" htmlFor="firstName">First Name: </label>
          <input className="profile-information-content-update"
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label  className="profile-information-category" htmlFor="lastName">Last Name: </label>
          <input  className="profile-information-content-update"
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="age">Age: </label>
          <input className="profile-information-content-update"
            type="number"
            id="age"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="nationality">Nationality: </label>
          <input className="profile-information-content-update"
            type="text"
            id="nationality"
            name="nationality"
            value={this.state.nationality}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="contactDetails">Contact Details: </label>
          <input className="profile-information-content-update"
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={this.state.contactDetails}
            onChange={this.handleChange}
          />
         
          <label className="profile-information-category" htmlFor="experience">Experience: </label>
          <input className="profile-information-content-update"
            type="text"
            id="experience"
            name="experience"
            value={this.state.experience}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="industryExpertise">Industry Expertise: </label>
          <input className="profile-information-content-update"
            type="text"
            id="generalExpertise"
            name="industryExpertise"
            value={this.state.industryExpertise}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="keySkills">Key Skills: </label>
          <input className="profile-information-content-update"
            type="text"
            id="keySkills"
            name="keySkills"
            value={this.state.keySkills}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="keyPersonalityTraits">Key Personality Traits: </label>
          <input className="profile-information-content-update"
            type="text"
            id="keyPersonalityTraits"
            name="keyPersonalityTraits"
            value={this.state.keyPersonalityTraits}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="availableForNewMentorship">Are You Available For A New Mentorship?</label>
          <input className="profile-information-content-update"
            type="checkbox"
            id="availableForNewMentorship"
            name="availableForNewMentorship"
            checked={this.state.availableForNewMentorship}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="activelyMentoring">Do Have Active Mentorships At The Moment?</label>
          <input className="profile-information-content-update"
            type="checkbox"
            id="activelyMentoring"
            name="activelyMentoring"
            checked={this.state.activelyMentoring}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="availableFromDate">From When On Will You Be Available For A New Mentorship?</label>
          <input className="profile-information-content-update"
            type="date"
            id="availableFromDate"
            name="availableFromDate"
            value={this.state.availableFromDate}
            onChange={this.handleChange}
          />

          <div className="button-container">

          <button className="form-button"type='submit'>Update</button>
          </div>
        </form>
        <form onSubmit={e => this.handleSubmitUpload(e)}>
            
            <input className="profile-information-content-update" style={{marginRight:"10px"}} type="text" name="imgName" value={this.state.imgName} onChange={e => this.handleChangeUpload(e)} />
            <input  type="file" onChange={e => this.handleFileUpload(e)} />
            
            <div className="button-container">
            
            <button className = "form-button" type="submit">Upload</button>
          
            </div>
            <p className = "help-text">Please ckick on the update button after clicking on upload</p>
          </form>
        
      </div>
    
    )
  }
}
