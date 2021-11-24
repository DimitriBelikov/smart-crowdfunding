const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    campaignName: {
        type: String,
        required: true
    },
    campaignDescription: {
        type: String,
        required: true
    },
    campaignOrganiser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requiredFunding: {
        type: Number,
        required: true
    },
    smartContractAddress: {
        type: String,
        default: null
    },
    campaignRequest: {
        requestNumber: Number,
        requestTitle: String,
        requestDescription: String,
        requestResources: [{
            type: String
        }],
        upVotePercentage: Schema.Types.Decimal128
    },
    currentVote:{
        yes: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        no:[{
            userId: {
                type:Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    },
    requestVotingHistory: [{
        requestNumber: Number,
        requestTitle: String,
        requestDescription: String,
        requestResources: [{
            type: String
        }],
        upVotePercentage: Schema.Types.Decimal128,
        camapignStatus: String
    }],
    donors: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        donationAmount: Schema.Types.Decimal128,
        donatedOn: Date
    }]
});

module.exports = mongoose.model('Campaign', campaignSchema);