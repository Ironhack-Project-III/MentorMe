// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Login from './components/Login'
import MentorProfile from './components/mentor/MentorProfile'
import MenteeProfile from './components/mentee/MenteeProfile'
import DeutschConnectProfile from './components/deutschConnect/DeutschConnectProfile'
import EditMentorProfile from './components/mentor/EditMentorProfile'

class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <div className='App' >
        <Navbar user={this.state.user} setUser={this.setUser} />
        
        {/* {this.state.user ? <h1>Welcome</h1> : <h1>Please log-in</h1>} */}

        <Route
          exact
          path='/signup'
          // to the Signup we have to pass a reference to the setUser method
          // this we cannot do via component={<some component>}
          // For this we use the render prop - The term “render prop” refers to a technique for sharing 
          // code between React components using a prop whose value is a function.
          // A component with a render prop takes a function that returns a React element and calls it 
          // instead of implementing its own render logic.
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        
        <Route
          exact
          path='/login'
          render={(props) => <Login setUser={this.setUser} {...props}/>}
        />

        
        <Route
          exact path='/mentor/profile/:id'
          //render={(props) => <MentorProfile user={this.state.user} setUser={this.setUser}/>}
          render={(props) => {
            if (this.state.user.role === 'Mentor') return <MentorProfile {...props} user={this.state.user} />
            else return <Redirect to='/' />
          }}
        />

        <Route
          exact path='/mentor/profile/:id/edit'
          render={(props) => {
            if (this.state.user.role === 'Mentor') return <EditMentorProfile {...props} user={this.state.user} />
            else return <Redirect to='/' />
          }}
        />

        <Route
          exact path='/mentee/profile/:id'
          //render={(props) => <MentorProfile user={this.state.user} setUser={this.setUser}/>}
          render={props => {
            if (this.state.user.role === 'Mentee') return <MenteeProfile {...props} user={this.state.user} />
            else return <Redirect to='/' />
          }}
        />

        <Route
          exact path='/deutschconnect/profile'
          //render={(props) => <MentorProfile user={this.state.user} setUser={this.setUser}/>}
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <DeutschConnectProfile user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />
        
        

      </div>
    );
  }
}

export default App;
