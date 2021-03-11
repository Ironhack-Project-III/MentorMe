// components/Signup.js
import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { signup } from '../services/auth';

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    message: '',
    role: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    //console.log(event.target)

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password, role } = this.state;

    signup(username, password, role).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: '',
          role: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/home');
      }
    });
  };

  render() {
    return (
      <div className = "body">
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              
            />

          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8 characters long.
            </Form.Text>

            <Form.Group>
                <Form.Label>Sign up as:</Form.Label>
                <Form.Control 
                  as="select"
                  name='role'
                  value={this.state.role}
                  onChange={this.handleChange}
                  id='role'
                >
                  <option>Please select your role</option>
                  <option>Mentor</option>
                  <option>Mentee</option>
                  
                </Form.Control>
            </Form.Group>
            
          </Form.Group>
          {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )}
          <div className="button-container">
          <Button className = "form-button" type='submit'>Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}