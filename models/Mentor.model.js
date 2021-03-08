const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mentorSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: { type: String, default: 'Mentor' },
  imgName: String,
  imgPath: {
    type: String,
    default: "https://deutsch-connect.com/wp-content/uploads/2021/01/cropped-cropped-dc_logo-1.jpeg"
  },
  firstName: String,
  lastName: String,
  eMail: String,
  contactInfo: String,
  website: String,
  age: String,
  nationality: String,
  aboutMe: String,
  keyIndustryExpertise: String,
  keyHardSkills: String,
  keySoftSkills: String,
  generalExpertise: String,
  keyPersonalityTraits: String,
  preferredSectors: String,
  availableForNewMentorship: Boolean,
  activelyMentoring: Boolean,
  availableFromDate: String
},
{timestamps: true}
);


const Mentor = model("Mentor", mentorSchema);

module.exports = Mentor;

// kiez:
// {
//   type: Schema.Types.ObjectId,
//   ref: 'Kiez'
// },

// Mentor
// Name
// Age
// Nationality
// Experience
// Key Skills
// Personality Traits ( they fill in )
// Preferred Sectors