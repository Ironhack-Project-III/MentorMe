import React from 'react'
import { Navbar as Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function StartEnd() {
  return (
    <div>

  <Card>
    <Card.Img variant="bottom" src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" />
    <Card.Body>
      <Card.Text>
      
          Weclome to DeutschConnect MentorMe!
          <div className="button-container">
              <div className="button">
              <Link className = "button-text" to='/signup'>Signup
              </Link>
              </div>
              </div>

              <div className="button-container">
              <div className="button">
              <Link className = "button-text" to='/login'>Login
              </Link>
              </div>
              </div>

      </Card.Text>
    </Card.Body>
  </Card>
      
    </div>
  )
}

