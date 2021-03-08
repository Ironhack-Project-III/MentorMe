const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const menteeSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: { type: String, default: 'Mentee' },
  firstName: String,
  lastName: String,
  age: Number,
  nationality: String,
  personality: String,
  requiredSupport: String,
  businessName: String,
  businessDescription: String, 
  yearsOfOperation: String,
  teamSize: String,
  website: String,
  sector: String,
  imgName: String,
  imgPath: {
    type: String,
    default: "https://deutsch-connect.com/wp-content/uploads/2021/01/cropped-cropped-dc_logo-1.jpeg"
  },
  preferredMentors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mentor'
    }
  ],
   Mentorship: [
    {
      mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
      startDate: String,
      endDate: String,
      confirmed: Boolean
    }
  ],
},
{timestamps: true}
);

const Mentee = model("Mentee", menteeSchema);

module.exports = Mentee;