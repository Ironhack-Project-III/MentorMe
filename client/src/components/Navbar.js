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
    <Nav className='nav justify-content-end' bg='primary'>
      {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>}
      <Nav.Brand>
        <Link style={{color:'white'}} to='/'>Home</Link>
      </Nav.Brand>
      
      {props.user ? (
        <>
        {console.log(props.user.role)}
        {(props.user.role === 'Mentor') ? (
          <Nav.Brand>
            <Link style={{color:'white'}} to={`/mentor/profile/${props.user._id}`}>
              My Profile
            </Link>
          </Nav.Brand>
        ): (props.user.role === 'Mentee') ? (
          <Nav.Brand>
            <Link style={{color:'white'}} to='/mentee/profile'>
              My Profile
            </Link>
          </Nav.Brand>
        ): <Nav.Brand>
            <Link style={{color:'white'}} to='/deutschconnect/profile'>
              My Profile
            </Link>
          </Nav.Brand>
        }
        

          
          <Nav.Brand>
            <Link style={{color:'white'}} to='/' onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </Nav.Brand>
        </>
      ) : (
          <>
            <Nav.Brand>
              <Link style={{color:'white'}} to='/signup'>Signup</Link>
            </Nav.Brand>
            <Nav.Brand>
              <Link style={{color:'white'}} to='/login'>Login</Link>
            </Nav.Brand>
          </>
        )}
    </Nav>
  )
}

export default Navbar;