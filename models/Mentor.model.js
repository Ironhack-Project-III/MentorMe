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
    default: "https://deutsch-connect.com/wp-content/uploads/2021/01/cropped-cropped-dc_logo-1.jpeg",
    required: true
  },
  firstName: String,
  lastName: String,
  contactDetails: String,
  age: String,
  nationality: String,
  experience: String,
  industryExpertise: String,
  keySkills: String,
  keyPersonalityTraits: String,
  availableForNewMentorship: {
    type: Boolean,
    default: true
  },
  activelyMentoring: {
    type: Boolean,
    default: true
  },
  availableFromDate: String
},
{timestamps: true}
);


const Mentor = model("Mentor", mentorSchema);

module.exports = Mentor;