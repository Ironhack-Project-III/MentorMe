import React, { Component } from 'react'
import axios from 'axios'
import service from '../../services/cloudinary'
import './mentee.css'



export default class EditMenteeProfile extends Component {


  state = {
    menteeProfile: this.props.user,
    nameHeader: this.props.user.firstName,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    age: this.props.user.age,
    nationality: this.props.user.nationality,
    contactDetails: this.props.user.contactDetails,
    website: this.props.user.website,
    requiredSupport: this.props.user.requiredSupport,
    businessName: this.props.user.businessName,
    businessDescription: this.props.user.businessDescription,
    yearsOfOperation: this.props.user.yearsOfOperation,
    sector: this.props.user.sector,
    keyPersonalityTraits: this.props.user.keyPersonalityTraits,
    availableForNewMentorship: this.props.user.availableForNewMentorship,
    activeMentorship: this.props.user.activeMentorship,
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

    axios.put(`/api/mentee/profile/${this.state.menteeProfile._id}/edit`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      nationality: this.state.nationality,
      contactDetails: this.state.contactDetails,
      website: this.state.website,
      requiredSupport: this.state.requiredSupport,
      businessName: this.state.businessName,
      businessDescription: this.state.businessDescription,
      yearsOfOperation: this.state.yearsOfOperation,
      sector: this.state.sector,
      keyPersonalityTraits: this.state.keyPersonalityTraits,
      availableForNewMentorship: this.state.availableForNewMentorship,
      activeMentorship: this.state.activeMentorship,
      availableFromDate: this.state.availableFromDate,
      imgPath: this.state.imgPath
    })
      .then(response => {

        //update usersession with updated data to get it without the need of refreshing the browser window
       this.props.setUser(response.data)
        //redirect to profile
       this.props.history.push(`/mentee/profile/${response.data._id}`)

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

  // this method submits the form
  handleSubmitUpload = e => {
    e.preventDefault();
 
    service
      .saveNewThing(this.state)
      .then(res => {
        //console.log('added: ', res);
        // here you would redirect to some other page
      })
      .catch(err => {
        console.log('Error while adding the thing: ', err);
      });
  };


  render() {
    
    return (
      
      <div className="body">
        <h3>Edit Your Mentee Profile</h3>
        <form className="mentorship-information" onSubmit={this.handleSubmit}>
          <label className="profile-information-category" htmlFor="firstName">First Name </label>
          <input   className="profile-information-content-update"
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="lastName">Last Name </label>
          <input  className="profile-information-content-update"
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label className="profile-information-category"  htmlFor="age">Age </label>
          <input className="profile-information-content-update"
            type="number"
            id="age"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="nationality">Nationality </label>
          <input className="profile-information-content-update"
            type="text"
            id="nationality"
            name="nationality"
            value={this.state.nationality}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="contactDetails">Contact Details </label>
          <input className="profile-information-content-update"
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={this.state.contactDetails}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="website">Website </label>
          <input className="profile-information-content-update"
            type="text"
            id="website"
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
          />
         
          <label className="profile-information-category" htmlFor="requiredSupport">Required Support </label>
          <input className="profile-information-content-update"
            type="text"
            id="requiredSupport"
            name="requiredSupport"
            value={this.state.requiredSupport}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="businessName">Business Name </label>
          <input className="profile-information-content-update"
            type="text"
            id="businessName"
            name="businessName"
            value={this.state.businessName}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="businessDescription">Business Description </label>
          <input className="profile-information-content-update"
            type="text"
            id="businessDescription"
            name="businessDescription"
            value={this.state.businessDescription}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="yearsOfOperation">Years of Operation </label>
          <input className="profile-information-content-update"
            type="text"
            id="yearsOfOperation"
            name="yearsOfOperation"
            value={this.state.yearsOfOperation}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="sector">Sector </label>
          <input className="profile-information-content-update"
            type="text"
            id="sector"
            name="sector"
            value={this.state.sector}
            onChange={this.handleChange}
          />

          <label className="profile-information-category" htmlFor="keyPersonalityTraits">Key Personality Traits </label>
          <input className="profile-information-content-update"
            type="text"
            id="keyPersonalityTraits"
            name="keyPersonalityTraits"
            value={this.state.keyPersonalityTraits}
            onChange={this.handleChange}
          />
          
          <label className="profile-information-category" htmlFor="availableForNewMentorship">availableForNewMentorship </label>
          <input className="profile-information-content-update"
            type="checkbox"
            id="availableForNewMentorship"
            name="availableForNewMentorship"
            checked={this.state.availableForNewMentorship}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="activeMentorship">activeMentorship </label>
          <input className="profile-information-content-update"
            type="checkbox"
            id="activeMentorship"
            name="activeMentorship"
            checked={this.state.activeMentorship}
            onChange={this.handleChange}
          />
          <label className="profile-information-category" htmlFor="availableFromDate">availableFromDate </label>
          <input className="profile-information-content-update"
            type="date"
            id="availableFromDate"
            name="availableFromDate"
            value={this.state.availableFromDate}
            onChange={this.handleChange}
          />
          <div className="button-container">
          <button className="form-button" type='submit'>Update</button>
          </div>
        </form>
        <form onSubmit={e => this.handleSubmitUpload(e)}> 
                <input className="profile-information-content-update" style={{marginRight:"10px"}} type="text" name="imgName" value={this.state.imgName} placeholder="Upload your picture" onChange={e => this.handleChangeUpload(e)} />
                <input type="file" onChange={e => this.handleFileUpload(e)} />
                <div className="button-container">
                <button className = "form-button" type="submit">Upload</button>
                </div>
                <p className = "help-text">Please ckick on the update button after clicking on upload</p>
        </form>
      
        
        </div>
    )
  }
}
  
 
 
