const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mentorshipSchema = new Schema({
    mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
    mentee: { type: Schema.Types.ObjectId, ref: 'Mentee' },
    startDate: String,
    endDate: String,
    confirmed: Boolean,
    messages: [
        {
        type: String
        }
    ]
},
{timestamps: true}
);

const Mentorship = model("Mentorship", mentorshipSchema);

module.exports = Mentorship;