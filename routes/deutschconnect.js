const router = require("express").Router();
//const DeutschConnect = require('../models/DeutschConnect.model');
const Mentee = require('../models/Mentee.model');
const Mentor = require('../models/Mentor.model');
const Mentorship = require('../models/Mentorship.model');



// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

//get all Mentorships for mentorship-overview
router.get('/deutschconnect/mentorships-overview', (req, res, next) => {

  Mentorship.find()
    .populate('mentor')
    .populate('mentee')
    .then(mentorship => {
      //console.log(mentorship, 'allMentorships')
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

//get Mentors and Mentees for create a new mentorship
router.get('/deutschconnect/mentorship-create', (req, res, next) => {

  Mentor.find()
    .then(mentors => {
      Mentee.find()
        .then(mentees => {
          res.status(200).json({mentors, mentees})
      })
      
    })
    .catch(err => {
      next(err)
  })
})

//create new Mentorship entry
router.post('/deutschconnect/mentorship-create', (req, res, next) => {
 // console.log("router /mentorcreate post triggered")
  let {mentor, mentee, startDate, endDate, confirmed} = req.body
 // console.log(req.body, "body at BE DC.js")

  Mentorship.create({mentor, mentee, startDate, endDate, confirmed})
    .then(mentorship => {
     // console.log('created new mentorship', mentorship)
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
  })
})

//delete mentorship
router.delete('/deutschconnect/mentorships-overview/:id', (req, res) => {
  // delete the project

  console.log('Mentorship tb deleted', req.params)
  Mentorship.findByIdAndDelete(req.params.id)
    .then(mentorship => {
        res.status(200).json(mentorship);
    })
    .catch(err => {
      res.json(err);
    });
});

//update mentorship dates
router.put('/deutschconnect/mentorships-overview/:id', (req, res, next) => {
  console.log('backend', req.body)
  const { 
    startDate,
    endDate
  } = req.body;

  Mentorship.findByIdAndUpdate(req.params.id, { 
    startDate,
    endDate
      }, { new: true })
    .then(mentorship => {
     //console.log('new mentorship in db', mentorship)
      res.status(200).json(mentorship)
    })
    .catch(err => {
      next(err)
    })
});

//get all Mentors for mentor-list

router.get('/deutschconnect/mentor-list', (req, res, next) => {
  Mentor.find()
    .then(mentor => {
      res.status(200).json(mentor)
    })
    .catch(err => {
      next(err)
  })
})

//get all Mentees and Mentorships for mentee-list

router.get('/deutschconnect/mentee-list', (req, res, next) => {
  Mentee.find()
    .populate('preferredMentors')
    .then(mentees => {
        Mentorship.find()
          .populate('mentor')
          .populate('mentee')
          .then(mentorships => {
            res.status(200).json({mentorships, mentees})
          })
    })
    .catch(err => {
      next(err)
  })
})

//delete mentor and connected mentorships from database
router.delete('/deutschconnect/mentor-list/:id', (req, res) => {
  // delete the project

  Mentor.findByIdAndDelete(req.params.id)
    .then(mentor => {
      Mentorship.deleteMany({mentor: req.params.id})
       .then(mentorships => {
         console.log('check', mentorships)
        res.status(200).json(mentor);
       })
        
    })
    .catch(err => {
      res.json(err);
    });
});

//delete mentee and connected mentorships from database
router.delete('/deutschconnect/mentee-list/:id', (req, res) => {
  // delete the project

  Mentee.findByIdAndDelete(req.params.id)
    .then(mentee => {
      Mentorship.deleteMany({mentee: req.params.id})
       .then(mentorships => {
         console.log('check', mentorships)
        res.status(200).json(mentee);
       })
        
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;