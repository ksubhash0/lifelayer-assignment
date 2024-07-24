const mongoose = require('mongoose');
const {Schema} = mongoose;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    portfolio: {
       type: String
    },
    educations: [
        {
            degree: {
                type: String
            },
            university: {
                type: String
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            }
        }
    ],
    experiences: [
        {
            company: {
                type: String
            },
            role: {
                type: String
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            }
        }
    ]
});

const Candidates = mongoose.model('Candidates', candidateSchema);
module.exports = Candidates;