// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// session configuration
const session = require('express-session');
// session store using mongo

// const mongoose = require('./db/index');

const MongoStore = require('connect-mongo')(session)

const mongoose = require('./db/index');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    //Forces the session to be saved back to the session store, 
    // even if the session was never modified during the request.
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)
// end of session configuration

// passport configuration
const Mentor = require('./models/Mentor.model');
const Mentee = require('./models/Mentee.model');
const DeutschConnect = require('./models/DeutschConnect.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// we serialize only the `_id` field of the user to keep the information stored minimum
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// when we need the information for the user, the deserializeUser function is called with the id that we previously serialized to fetch the user from the database
passport.deserializeUser((id, done) => {
  Mentor.findById(id)
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(err => {
      done(err);
    });
});

passport.deserializeUser((id, done) => {
  Mentee.findById(id)
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(err => {
      done(err);
    });
});

passport.deserializeUser((id, done) => {
  DeutschConnect.findById(id)
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(err => {
      done(err);
    });
});



passport.use(
  new LocalStrategy((username, password, done) => {
    // login
    //check if username with role mentor exists in mentor-collection
    Mentor.findOne({ username: username})
      .then(userFromDB => {
        if (userFromDB === null) {
          // there is no user with this username and role in Mentor-Collection, 
            // therfore check if username with role mentor exists in mentor-collection
          Mentee.findOne({ username: username})
          .then(userFromDB => {
            if (userFromDB === null) {
              // there is no user with this username
              DeutschConnect.findOne({ username: username})
                .then(userFromDB => {
                  if (userFromDB === null) {
                    // there is no user with this username
                    done(null, false, { message: 'Wrong Credentials' });
                  } else if (!bcrypt.compareSync(password, userFromDB.password)) {
                    // the password is not matching
                    done(null, false, { message: 'Wrong Credentials' });
                  } else {
                    // the userFromDB should now be logged in
                    console.log('Mentee logged in')
                    done(null, userFromDB)
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            } else if (!bcrypt.compareSync(password, userFromDB.password)) {
              // the password is not matching
              done(null, false, { message: 'Wrong Credentials' });
            } else {
              // the userFromDB should now be logged in
              console.log('Mentee logged in')
              done(null, userFromDB)
            }
          })
          .catch(err => {
            console.log(err);
          })
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          // the password is not matching
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // the userFromDB should now be logged in
          done(null, userFromDB)
        }
      })
      .catch(err => {
        console.log(err);
      })
  })
)


app.use(passport.initialize());
app.use(passport.session());


// end of passport



// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/api", index);

const auth = require('./routes/auth')
app.use('/api/auth', auth);

const mentee = require('./routes/mentee')
app.use('/api', mentee);

const mentor= require('./routes/mentor')
app.use('/api', mentor);

const deutschconnect = require('./routes/deutschconnect')
app.use('/api', deutschconnect);


// app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  
  // If no routes match, send them the React HTML.
  //res.sendFile(__dirname + "/client/build/index.html");
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
