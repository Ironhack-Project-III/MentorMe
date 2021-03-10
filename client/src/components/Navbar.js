import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = props => {
  return (
    <Nav className='nav justify-content-end' bg="light" variant="light" expand="lg" sticky="top" >

      {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>}

      
   
      {props.user ? (
        <>
        <Nav.Toggle aria-controls="basic-navbar-nav" />

        <Nav.Collapse id="basic-navbar-nav">
       
        <Nav.Brand>
          <Link style={{color:'grey'}} to='/'>Home</Link>
        </Nav.Brand>
        {console.log(props.user.role)}
        
        {(props.user.role === 'Mentor') ? (
          <Nav.Brand>
            <Link style={{color:'grey'}} to={`/mentor/profile/${props.user._id}`}>
              My Profile
            </Link>
          </Nav.Brand>
        ): (props.user.role === 'Mentee') ? (
          <Nav.Brand>
            <Link style={{color:'grey'}} to={`/mentee/profile/${props.user._id}`}>
              My Profile
            </Link>
          </Nav.Brand>
        ): <Nav.Brand>
            <Link style={{color:'grey'}} to='/deutschconnect/profile'>
              My Profile
            </Link>
          </Nav.Brand>
        }
   

        { props.user.role === 'DeutschConnect' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/deutschconnect/mentorships-overview'>
              Overview
            </Link>
          </Nav.Brand>
        }

        { props.user.role === 'DeutschConnect' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/deutschconnect/mentorship-create'>
              Create New
            </Link>
          </Nav.Brand>
        }

        { props.user.role === 'DeutschConnect' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/deutschconnect/mentor-list'>
              Mentors-List
            </Link>
          </Nav.Brand>
        }

        { props.user.role === 'DeutschConnect' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/deutschconnect/mentee-list'>
              Mentees-List
            </Link>
          </Nav.Brand>
        }

        { props.user.role === 'Mentee' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/mentee/mentor-list'>
              Mentor Overview
            </Link>
          </Nav.Brand>
        }

        { props.user.role === 'Mentee' && 
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/mentee/my-mentorship'>
              My Mentorship
            </Link>
          </Nav.Brand>
        }
          <Nav.Brand>
            <Link style={{color:'grey'}} to='/' onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </Nav.Brand>
          </Nav.Collapse>
        </>
      ) : (
          <>
            <Nav.Brand>
              <Link style={{color:'grey'}} to='/signup'>Signup</Link>
            </Nav.Brand>
            <Nav.Brand>
              <Link style={{color:'grey'}} to='/login'>Login</Link>
            </Nav.Brand>
          </>
        )}
        
    </Nav>
  )
}

export default Navbar;