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
    campaignCoverMedia: {
        type: String,
    },
    campaignResources: [{
        type: String
    }],
    campaignCategory: {
        type: String,
        required: true
    },
    campaignCreatedOn: {
        type: Date,
        required: true
    },
    campaignLastEditedOn: {
        type: Date,
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
    amountCollected: {
        type: Number,
        default: 0
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
        requestAmount: Number,
        upVotePercentage: Schema.Types.Decimal128,
        requestCreatedOn: Date,
        requestLastEditedOn: Date,
        deadline: Date
    },
    currentVote:{
        yes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        no:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    requestVotingHistory: [{
        requestNumber: Number,
        requestTitle: String,
        requestDescription: String,
        requestResources: [{
            type: String
        }],
        requestAmount: Number,
        upVotePercentage: Schema.Types.Decimal128,
        requestCreatedOn: Date,
        requestLastEditedOn: Date,
        deadline: Date,
        requestStatus: {
            type: String,
            enum: ['FundsDisbursed', 'Cancelled', 'FundsDenied']
        }
    }],
    donors: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        donationAmount: Schema.Types.Decimal128,
        donationDate: Date
    }]
});

module.exports = mongoose.model('Campaign', campaignSchema);