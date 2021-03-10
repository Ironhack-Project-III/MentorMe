// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Login from './components/Login'
import MentorProfile from './components/mentor/MentorProfile'
import EditMentorProfile from './components/mentor/EditMentorProfile'
import MenteeProfile from './components/mentee/MenteeProfile'
import MentorList from './components/mentee/MentorList'
import EditMenteeProfile from './components/mentee/EditMenteeProfile'
import DeutschConnectProfile from './components/deutschConnect/DeutschConnectProfile'
import MentorshipOverview from './components/deutschConnect/MentorshipOverview'
import CreateNewMentorship from './components/deutschConnect/CreateNewMentorship'
import MyMentorship from './components/mentee/MyMentorship';
import MentorListDC from './components/deutschConnect/Mentor-list'
import MenteeListDC from './components/deutschConnect/Mentee-list'
import CreateNewMentorshipID from './components/deutschConnect/CreateNewMentorshipID';
import MyMentorships from './components/mentor/MyMentorships'





class App extends React.Component {

  state = {
    user: this.props.user,
    messages: null
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  setMessages = message => {
    this.setState({
      messages: message
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
            if (this.state.user.role === 'Mentor') return <EditMentorProfile {...props} user={this.state.user} setUser={this.setUser}/>
            else return <Redirect to='/' />
          }}
        />

        <Route
          exact path='/mentor/my-mentorship'
          render={props => {
            if (this.state.user.role === 'Mentee') return <MyMentorships {...props} user={this.state.user} setUser={this.setUser}/>
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
          exact path='/mentee/profile/:id/edit'
          //render={(props) => <MentorProfile user={this.state.user} setUser={this.setUser}/>}
          render={props => {
            if (this.state.user.role === 'Mentee') return <EditMenteeProfile {...props} user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />

        <Route
          exact path='/mentee/my-mentorship'
          render={props => {
            if (this.state.user.role === 'Mentee') return <MyMentorship {...props} user={this.state.user} setUser={this.setUser}/>
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

        {/* Mentor overview for mentee */}

        <Route
          exact path='/mentee/mentor-list'
          //render={(props) => <MentorProfile user={this.state.user} setUser={this.setUser}/>}
          render={props => {
            if (this.state.user.role === 'Mentee') return <MentorList {...props} user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />

        {/* Mentorships Overview for DeutschConnect */}

        <Route
          exact path='/deutschconnect/mentorships-overview'
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <MentorshipOverview {...props} user={this.state.user} setUser={this.setUser}/>
            else return <Redirect to='/' />
          }}
        />

        {/* Create New Mentorship for DeutschConnect */}

        <Route
          exact path='/deutschconnect/mentorship-create'
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <CreateNewMentorship {...props} user={this.state.user} setUser={this.setUser}/>
            else return <Redirect to='/' />
          }}
        />
        
        {/* Mentors-List for DeutschConnect */}
        <Route
          exact path='/deutschconnect/mentor-list'
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <MentorListDC {...props} user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />

        {/* Mentees-List for DeutschConnect */}
        <Route
          exact path='/deutschconnect/mentee-list'
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <MenteeListDC {...props} user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />

        {/* Create Mentorship from Mentees-List for DeutschConnect */}
        <Route
          exact path='/deutschconnect/mentorship-create/:id'
          render={props => {
            if (this.state.user.role === 'DeutschConnect') return <CreateNewMentorshipID {...props} user={this.state.user} setUser={this.setUser} />
            else return <Redirect to='/' />
          }}
        />

      </div>
    );
  }
}

export default App;
