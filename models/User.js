const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        index: { unique: true }
    },
    currentCity: {
        type: String
    },
    state: {
        type: String
    },
    donatedCampaigns: [{
        campaignId: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign'
        },
        donationAmount: Number,
        donatedOn: Date
    }],
    createdCampaigns: [{
        campaignId: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign'
        },
    }]
});

module.exports = mongoose.model('User', userSchema);
