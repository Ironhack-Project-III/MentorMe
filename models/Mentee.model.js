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
  requiredSupport: String,
  businessName: String,
  businessDescription: String, 
  yearsOfOperation: String,
  contactDetails: String,
  website: String,
  sector: String,
  keyPersonalityTraits: String,
  activeMentorship: Boolean,
  availableFromDate: String,
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
},
{timestamps: true}
);

const Mentee = model("Mentee", menteeSchema);

module.exports = Mentee;