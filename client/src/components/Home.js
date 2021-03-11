import React from 'react';
import './Home.css';

export default class Home extends React.Component {

    
    render() {
        return (

            <div className="body"> 
                <br></br>
                    <img className='Logo' src="https://deutsch-connect.com/wp-content/uploads/2021/01/cropped-cropped-dc_logo-1.jpeg" alt="DeutschConnect Logo"/>
                    <h1><br></br>Welcome to MentorMe <br></br>- <br></br>The Mentorship-Platform of DeutschConnect</h1>
                    <div className="form-box">
                    {(this.props.user.role !== 'DeutschConnect' &&
                    <div>
                        <p>We are glad to have you on board and that you are part of this Journey now!</p>
                        <p className="italic">Have a look at your Profile and if necessary complete it, so that you can make the most of your mentorship.</p>
                    </div>
                    )}
                    <p className="slogan">DeutschConnect links Sub-Saharan African businesses, organisations and people to the German ecosystem, to strengthen knowledge transfer and local economies. </p>
                    </div>

            </div>
        )
    }
}