const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor.model');
const Mentee = require('../models/Mentee.model');
const bcrypt = require('bcrypt');
const passport = require('passport');


router.post('/signup', (req, res) => {
  //console.log("boom")
  
  //console.log('req', req.body)
  const { username, password, role } = req.body;
  //console.log('role', role)

  if (role === 'Mentor') {
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Your password must be 8 char. min.' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Your username cannot be empty' });
    }
  
    Mentor.findOne({ username: username })
      .then(found => {
        if (found) {
          return res
            .status(400)
            .json({ message: 'This username is already taken' });
        }
        if (!found) {
          Mentee.findOne({ username: username })
        .then (menteeName => {
          if (menteeName) {
            return res
              .status(400)
              .json({ message: 'This username is already taken' });
          }
        })
        

        
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
  
        return Mentor.create({ username: username, password: hash }).then(
          dbUser => {
  
            req.login(dbUser, err => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: 'Error while attempting to login' });
              }
              res.json(dbUser);
            });
          }
        );
        }
      })
      .catch(err => {
        res.json(err);
      });
   
  } else {
    //console.log('Mentee role??? ->', role)
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Your password must be 8 char. min.' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Your username cannot be empty' });
    }
  
    Mentee.findOne({ username: username })
      .then(found => {
        if (found) {
          return res
            .status(400)
            .json({ message: 'This username is already taken' });
        }

        if (!found) {
          Mentor.findOne({ username: username })
        .then (mentorName => {
          if (mentorName) {
            return res
              .status(400)
              .json({ message: 'This username is already taken' });
          }
        })
  
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
  
        return Mentee.create({ username: username, password: hash }).then(
          dbUser => {
  
            req.login(dbUser, err => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: 'Error while attempting to login' });
              }
              res.json(dbUser);
            });
          }
        );
       }
      })
      .catch(err => {
        res.json(err);
      });
    
  }

});


router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.status(200).json(user);
    });
  })(req, res);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
});

// returns the logged in user
router.get('/loggedin', (req, res) => {
  res.json(req.user);
});

module.exports = router;