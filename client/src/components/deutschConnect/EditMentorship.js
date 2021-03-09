import React, { Component } from 'react'

export default class EditMentorship extends Component {

  state= {
    toggled: true,
    startDate: this.props.mentorship.startDate
  }

  toggleEditForm = () => {
    this.setState((prevState) => ({
      toggled: !prevState.toggled
    }))
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    
    return (
      
      <div>
        
        <button onClick={this.toggleEditForm}>Change Dates</button>

        {this.state.toggled ? 
        <div>
          <p>Edit Mentorship</p>
          <form onSubmit={() => this.props.handleSubmit(this.props.mentorship._id, {startDate: this.state.startDate})}>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
              >
            </input>
            <button type='submit'>Update this mentorship</button>
          </form>
        </div>
         : '' }
      </div>
    )
  }
}