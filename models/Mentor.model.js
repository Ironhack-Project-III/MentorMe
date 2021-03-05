const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mentorSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: { type: String, default: 'Mentor' },
  firstName: String,
  lastName: String,
  eMail: String,
  contactInfo: String,
  // imgName: String,
  // imgPath: {
  //   type: String,
  //   default: "https://deutsch-connect.com/wp-content/uploads/2021/01/cropped-cropped-dc_logo-1.jpeg"
  // },
  // industryExpertise: [{
  //   type: String
  // }],
  // hardSkillExpertise: [{
  //   type: String
  // }],
  // softSkillExpertise: [{
  //   type: String
  // }],
  // personality:
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