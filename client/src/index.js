// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import axios
import axios from 'axios';

// get logged in user and pass it as a prop
axios.get('/api/auth/loggedin')
  .then(response => {
    const user = response.data;
    ReactDOM.render(
      <BrowserRouter>
        <App user={user} />
      </BrowserRouter>,
      document.getElementById('root')
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
