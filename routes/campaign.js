const express = require('express');
const router = express.Router();
const eth = require('../ETHBackend/deploy-contract');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { Decimal128 } = require('bson');

//Models
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const { dirxml } = require('console');
const rootDocumentPath = 'documents'

//Configurations
const { campaignUpload, requestUpload } = require('../config/multerConfig');

// GET('/') - Get list of all Campaigns
router.get("/", (req, res) => {
    Campaign.find().then(
        campaigns => {
            res.status(200).json(campaigns)
        }
    ).catch(
        error => res.status(400).json({ msg: 'Error Fetching Campaigns: ' + error })
    );
});


// POST('/') - Create a new Campaign (Deploy Smart Contract for this campaign ang get its address)
const cpUpload = campaignUpload.fields([{ name: 'campaignCoverMedia', maxCount: 1 }, { name: 'campaignResources', maxCount: 15 }])
router.post("/", cpUpload, (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const { campaignId, campaignName, campaignDescription, campaignCategory, /*campaignOrganiser*/ requiredFunding } = req.body;
    const campaignResources = req.files.campaignResources.map(({ originalname, size }) => {
        if (size / 1024 < 1000)
            fileSize = (size / 1024).toFixed(1) + " KB";
        else
            fileSize = ((size / 1024) / 1024).toFixed(1) + " MB";
        return { filePath: path.join(campaignId, 'documents', originalname).replace(/\\/g, "/"), fileSize }
    });
    const campaignCoverMedia = path.join(campaignId, 'documents', 'campaignCoverMedia' + path.extname(req.files.campaignCoverMedia[0].originalname)).replace(/\\/g, "/");

    console.log(campaignCoverMedia);
    console.log(campaignResources);

    const walletProvider = eth.provider();
    eth.deployContract(walletProvider).then(
        smartContractAddress => {
            const campaign = new Campaign({
                _id: mongoose.Types.ObjectId(campaignId),
                campaignName,
                campaignDescription,
                campaignCoverMedia,
                campaignResources,
                campaignCategory,
                campaignOrganiser: mongoose.Types.ObjectId('619b3e236135cd4fab42cd64'),
                requiredFunding: requiredFunding * Math.pow(10, 18),
                smartContractAddress,
                campaignCreatedOn: new Date(Date.now()),
                campaignLastEditedOn: new Date(Date.now())
            });

            campaign.save().then(
                campaignObject => {
                    console.log('--> New Campaign Created. Document Saved on Database.\n');
                    res.status(200).json(campaignObject);
                }
            ).catch(
                error => res.status(400).json({ msg: "Error while creating new Campaign: " + error })
            );
        }).catch(
            error => res.status(400).json({ msg: "Error while creating new Campaign: " + error })
        );
});


// GET('/:id') - Get Details of a Particular Campaign
router.get('/:id', (req, res) => {
    Campaign.findById(req.params.id).then(
        campaignData => res.status(200).json(campaignData)
    ).catch(
        error => res.status(400).json({ msg: 'Error Fetching Campaign Details: ' + error })
    );
});


// PUT('/:id') - Update a Particular Campaign
router.put('/:id', (req, res) => {
    const { campaignName, campaignDescription } = req.body;
    // const campaignResources = ["./img/img1.jpg"];
    // const campaignCoverMedia = './img/hshs.jpg';

    const updatedCampaign = {
        campaignName,
        campaignDescription,
        // campaignCoverMedia,
        // campaignResources,
        campaignLastEditedOn: new Date(Date.now())
    };

    Campaign.findByIdAndUpdate(req.params.id, updatedCampaign, { returnDocument: 'after' }, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Updating Campaign Details: ' + error });
        res.status(200).json(response);
    });
});


// DELETE('/:id') - Delete a Particular Campaign - (Destroy Smart Contract)
router.delete('/:id', (req, res) => {
    Campaign.findByIdAndDelete(req.params.id, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Deleting Campaign: ' + error });

        // Destroy the Contract - Web3 module

        // Notify to the donors - mail
        res.status(200).json(response);
    });
});


// POST('/:id/request') - Create a New Request for a particular Campaign
router.post('/:id/request', requestUpload.fields([{ name: 'requestResources', maxCount: 5 }]), (req, res) => {
    const { requestNumber, requestTitle, requestDescription, requestAmount, deadline } = req.body;
    const requestResources = req.files.requestResources.map(({ originalname, size }) => {
        if (size / 1024 < 1000)
            fileSize = (size / 1024).toFixed(1) + " KB";
        else
            fileSize = ((size / 1024) / 1024).toFixed(1) + " MB";
        return { filePath: path.join(req.params.id, 'requests', requestNumber, originalname).replace(/\\/g, "/"), fileSize }
    });
    console.log(req.files);
    console.log(req.body);
    console.log(requestResources);
    console.log(requestAmount);
    // return res.status(200).json({msg: "Done"});


    Campaign.findById(req.params.id, (error, campaign) => {
        if (campaign.campaignRequest.requestTitle != null) return res.status(400).json({ msg: "Your campaign's already has an existing active request" });
    })

    const request = {
        campaignRequest: {
            requestNumber,
            requestTitle,
            requestDescription,
            requestResources,
            requestAmount: requestAmount * Math.pow(10, 18),
            requestCreatedOn: new Date(Date.now()),
            requestLastEditedOn: new Date(Date.now()),
            deadline: new Date(deadline)
        }
    }
    console.log(request);

    Campaign.findByIdAndUpdate(req.params.id, request, { returnDocument: 'after' }, (error, response) => {
        if (error) return res.status(400).json({ msg: 'Error Creating a new Request: ' + error });
        //Notify donor that new request is created and its deadline to vote
        return res.status(200).json(response);
    });
});


// PUT('/:id/request/current') - Update Details of a current Request for a Particular Campaign
router.put('/:id/request/current', (req, res) => {
    const { requestTitle, requestDescription } = req.body;
    // const requestResources = req.files;

    const request = {
        'campaignRequest.requestTitle': requestTitle,
        'campaignRequest.requestDescription': requestDescription,
        'campaignRequest.requestLastEditedOn': new Date(Date.now())
    }

    Campaign.findByIdAndUpdate(req.params.id, request, { returnDocument: 'after' }, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Updating the Request: ' + error });
        //Notify donors that the request is updated
        res.status(200).json(response);
    });
});

//Common Function to delete curent request and add it to request voting history
function processRequest(req, res) {
    Campaign.findById(req.params.id).then(campaign => {
        const request = {
            requestNumber: campaign.campaignRequest.requestNumber,
            requestTitle: campaign.campaignRequest.requestTitle,
            requestDescription: campaign.campaignRequest.requestDescription,
            requestResources: campaign.campaignRequest.requestResources,
            requestAmount: campaign.campaignRequest.requestAmount,
            upVotePercentage: campaign.campaignRequest.upVotePercentage,
            requestStatus: req.params.status,
            requestCreatedOn: campaign.campaignRequest.requestCreatedOn,
            requestLastEditedOn: campaign.campaignRequest.requestLastEditedOn,
            deadline: campaign.campaignRequest.deadline
        }

        campaign.campaignRequest = { "requestResources": [] }
        campaign.requestVotingHistory.push(request);

        Campaign.findByIdAndUpdate(req.params.id, campaign, { returnDocument: 'after' }, (error, response) => {
            if (error) res.status(400).json({ msg: 'Error Deleting Request: ' + error });
            res.status(200).json(response);
        });
    }).catch(
        error => res.status(400).json({ msg: "Error Fetching Campaign Details: " + error })
    );
}


// POST('/:id/request/current/:status') - Delete Details of a current Request for a Particular Campaign
router.post('/:id/request/current/:status', (req, res) => {
    if (req.params.status == "FundsDisbursed") {
        //Notify smart contract to transfer funds to campaign creator
        //Notify user and campaign organoser
    } else if (req.params.status == "FundsDenied") {
        //Notify Campaign Organiser about denial and reasons
        //Notify user and campaign organoser
    } else if (req.params.status == "Cancelled") {
        //Notify smart contract to transfer respective donated funds to donors
        //Notify user and campaign organoser
    }
    processRequest(req, res);
});


// POST('/:id/vote') - Add's a Contributor's Vote for a Particular Request for a Particular Campaign
router.post('/:id/vote', (req, res) => {
    Campaign.findById(req.params.id).then(campaign => {
        if (req.body.vote == 'yes')
            campaign.currentVote.yes.push(req.body.userId);
        else if (req.body.vote == 'no')
            campaign.currentVote.no.push(req.body.userId);

        campaign.campaignRequest.upVotePercentage = Decimal128.fromString(((campaign.currentVote.yes.length / campaign.donors.length) * 100).toFixed(2));
        Campaign.findByIdAndUpdate(req.params.id, campaign, { returnDocument: 'after' }, (error, response) => {
            if (error) return res.status(400).json({ msg: 'Error voting for a campaign: ' + error });
            return res.status(200).json(response);
        });
    }).catch(
        error => res.status(400).json({ msg: "Error Fetching Campaign Details: " + error })
    );
});


// POST('/:id/donate') - Let a Contributor gets added to the Donors List and Interact with Smart Contract to add Donation amount
router.post('/:id/donate', (req, res) => {
    const userId = req.body.userId;
    const donationAmount = req.body.donationAmount * Math.pow(10, 18);
    // Call to smart contract for donation of amount

    Campaign.findById(req.params.id).then(campaign => {
        const donor = {
            userId,
            donationAmount,
            donationDate: new Date(Date.now())
        }
        campaign.donors.push(donor);
        campaign.amountCollected += donationAmount;
        Campaign.findByIdAndUpdate(req.params.id, campaign, { returnDocument: 'after' }, (error, response) => {
            if (error) return res.status(400).json({ msg: 'Error Voting: ' + error });

            User.findById(userId).then(user => {
                user.donatedCampaigns.push({
                    campaignId: req.params.id,
                    donationAmount,
                    donatedOn: new Date(Date.now())
                })
                User.findByIdAndUpdate(userId, user, { returnDocument: 'after' }, (error, response) => {
                    if (error) return res.status(400).json({ msg: 'Error updating user details: ' + error });
                    // return res.status(200).json(response);
                });
            }).catch(
                error => res.status(400).json({ msg: "Error Fetching User Details: " + error })
            );
            return res.status(200).json(response);
        });
    }).catch(
        error => res.status(400).json({ msg: "Error Fetching Campaign Details: " + error })
    );
});

module.exports = router;