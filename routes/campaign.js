const express = require('express');
const router = express.Router();
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
const updateHandler = require('../middlewares/updateHandler');

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
    const { campaignId, campaignName, campaignDescription, campaignCategory, campaignOrganiser, requiredFunding, smartContractAddress } = req.body;
    var campaignResources = [];
    var campaignCoverMedia = '';
    console.log(req.files.campaignResourcees);
    console.log(req.files.campaignCoverMedia);
    if (req.files.campaignResources != undefined) {
        campaignResources = req.files.campaignResources.map(({ originalname, size }) => {
            if (size / 1024 < 1000)
                fileSize = (size / 1024).toFixed(1) + " KB";
            else
                fileSize = ((size / 1024) / 1024).toFixed(1) + " MB";
            return { filePath: path.join('campaignDocuments', campaignId, 'documents', originalname).replace(/\\/g, "/"), fileSize }
        });
    }
    if (req.files.campaignCoverMedia != undefined) {
        campaignCoverMedia = path.join('campaignDocuments', campaignId, 'documents', 'campaignCoverMedia' + path.extname(req.files.campaignCoverMedia[0].originalname)).replace(/\\/g, "/");
    } else {
        const randFileNumber = Math.floor(Math.random() * 3) + 1;
        campaignCoverMedia = path.join('static', 'DefaultCampaignImage', campaignCategory, 'DefaultImage-0' + randFileNumber + '.jpg').replace(/\\/g, "/");
    }

    console.log(campaignCoverMedia);
    console.log(campaignResources);
    User.findById(campaignOrganiser).then(user => {
        if (user === null) return res.status(400).json({ msg: "User Does not Exists:" });

        const campaign = new Campaign({
            _id: mongoose.Types.ObjectId(campaignId),
            campaignName,
            campaignDescription,
            campaignCoverMedia,
            campaignResources,
            campaignCategory,
            campaignOrganiser,
            requiredFunding: requiredFunding * Math.pow(10, 18),
            smartContractAddress,
            campaignCreatedOn: new Date(Date.now()),
            campaignLastEditedOn: new Date(Date.now())
        });

        user.createdCampaigns.push({
            campaignId: mongoose.Types.ObjectId(campaignId)
        });

        User.findByIdAndUpdate(campaignOrganiser, user, { returnDocument: 'after' }, (error, response) => {
            if (error) return res.status(400).json({ msg: 'Error Updating User Campaign Details: ' + error });

            campaign.save().then(
                campaignObject => {
                    console.log('--> New Campaign Created. Document Saved on Database.\n');
                    return res.status(200).json(campaignObject);
                }
            ).catch(
                error => res.status(400).json({ msg: "Error while creating new Campaign: " + error })
            );
        });
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
router.put('/:id', cpUpload, (req, res, next) => {
    const { campaignId, campaignName, campaignDescription, campaignCoverMediaPath, campaignCategory, filePath, fileSize } = req.body;
    var updatedCampaignResources = [];
    console.log(req.body);
    console.log(req.files);

    if (filePath !== undefined) {
        if (typeof req.body.filePath !== 'string') {
            for (var i = 0; i < filePath.length; i++) {
                updatedCampaignResources.push({
                    filePath: filePath[i],
                    fileSize: fileSize[i]
                });
            }
        }
        else {
            updatedCampaignResources.push({
                filePath: filePath,
                fileSize: fileSize
            });
        }
        req.updateAreas = ['Documents'];
    }

    if (campaignCoverMediaPath == undefined && req.files.campaignCoverMedia == undefined) {
        const randFileNumber = Math.floor(Math.random() * 3) + 1;
        var newCampaignCoverMedia = path.join('static', 'DefaultCampaignImage', campaignCategory, 'DefaultImage-0' + randFileNumber + '.jpg').replace(/\\/g, "/");
    }

    if (req.files.campaignCoverMedia != undefined)
        var newCampaignCoverMedia = path.join('campaignDocuments', campaignId, 'documents', 'campaignCoverMedia' + path.extname(req.files.campaignCoverMedia[0].originalname)).replace(/\\/g, "/");

    updatedCampaign = {
        campaignName,
        campaignDescription,
        campaignCoverMedia: campaignCoverMediaPath === undefined ? newCampaignCoverMedia : campaignCoverMediaPath,
        campaignResources: updatedCampaignResources,
        campaignLastEditedOn: new Date(Date.now())
    };
    console.log(updatedCampaign);

    Campaign.findByIdAndUpdate(req.params.id, updatedCampaign, { returnDocument: 'before' }, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Updating Campaign Details: ' + error });
        res.status(200).json(response);
        if (response.campaignDescription !== campaignDescription || response.campaignName !== campaignName) {
            if (req.updateAreas != undefined)
                req.updateAreas.push('Description')
            else
                req.updateAreas = ['Description']
        }
        next();
    });
}, updateHandler);


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
const rqUpload = requestUpload.fields([{ name: 'requestResources', maxCount: 5 }])
router.post('/:id/request', rqUpload, (req, res, next) => {
    const { requestNumber, requestTitle, requestDescription, requestAmount, deadline } = req.body;
    const requestResources = req.files.requestResources.map(({ originalname, size }) => {
        if (size / 1024 < 1000)
            fileSize = (size / 1024).toFixed(1) + " KB";
        else
            fileSize = ((size / 1024) / 1024).toFixed(1) + " MB";
        return { filePath: path.join('campaignDocuments', req.params.id, 'requests', requestNumber, originalname).replace(/\\/g, "/"), fileSize }
    });
    // console.log(req.files);
    // console.log(req.body);
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

    Campaign.findByIdAndUpdate(req.params.id, request, { returnDocument: 'after' }, (error, response) => {
        if (error) return res.status(400).json({ msg: 'Error Creating a new Request: ' + error });
        //Notify donor that new request is created and its deadline to vote
        res.status(200).json(response);

        req.updateAreas = ['RequestCreated'];
        next();
    });
}, updateHandler);


// PUT('/:id/request/current') - Update Details of a current Request for a Particular Campaign
router.put('/:id/request/current', rqUpload, (req, res, next) => {
    console.log(req.body);
    console.log(req.files);

    const { requestTitle, requestDescription, deadline, filePath, fileSize } = req.body;

    var updatedRequestResources = [];
    if (filePath !== undefined) {
        if (typeof req.body.filePath !== 'string') {
            for (var i = 0; i < filePath.length; i++) {
                updatedRequestResources.push({
                    filePath: filePath[i],
                    fileSize: fileSize[i]
                });
            }
        }
        else {
            updatedRequestResources.push({
                filePath: filePath,
                fileSize: fileSize
            });
        }
    };

    const request = {
        'campaignRequest.requestTitle': requestTitle,
        'campaignRequest.requestDescription': requestDescription,
        'campaignRequest.requestResources': updatedRequestResources,
        'campaignRequest.deadline': new Date(deadline),
        'campaignRequest.requestLastEditedOn': new Date(Date.now())
    }

    Campaign.findByIdAndUpdate(req.params.id, request, { returnDocument: 'after' }, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Updating the Request: ' + error });
        //Notify donors that the request is updated
        res.status(200).json(response);

        req.updateAreas = ['RequestUpdated'];
        next();
    });
}, updateHandler);

//Common Function to delete curent request and add it to request voting history
function processRequest(req, res) {
    Campaign.findById(req.params.id).then(campaign => {
    console.log(campaign.campaignRequest.requestitle);
    if (campaign.campaignRequest.requestTitle !== undefined) {
        const request = {
            requestNumber: campaign.campaignRequest.requestNumber,
            requestTitle: campaign.campaignRequest.requestTitle,
            requestDescription: campaign.campaignRequest.requestDescription,
            requestResources: campaign.campaignRequest.requestResources,
            requestAmount: campaign.campaignRequest.requestAmount,
            upVotePercentage: req.body.upVotePercentage,
            requestStatus: req.params.status,
            requestCreatedOn: campaign.campaignRequest.requestCreatedOn,
            requestLastEditedOn: campaign.campaignRequest.requestLastEditedOn,
            deadline: campaign.campaignRequest.deadline
        }

        campaign.currentVote = { yes: [], no: [] };
        campaign.campaignRequest = { "requestResources": [] }
        campaign.requestVotingHistory.push(request);

        Campaign.findByIdAndUpdate(req.params.id, campaign, { returnDocument: 'after' }, (error, response) => {
            if (error) res.status(400).json({ msg: 'Error Deleting Request: ' + error });
            res.status(200).json(response);
        });
    } else {
        res.status(400).json({ msg: "Current Request Doesnt Exists.... Invalid Call" });
    }
    }).catch(
        error => res.status(400).json({ msg: "Error Fetching Campaign Details: " + error })
    );
}


// POST('/:id/request/current/:status') - Delete Details of a current Request for a Particular Campaign
router.post('/:id/request/current/:status', cpUpload, (req, res) => {
    console.log(req.body);
    if (req.params.status == "FundsDisbursed") {
        //Notify user and campaign organiser
    } else if (req.params.status == "FundsDenied") {
        //Notify Campaign Organiser about denial and reasons
        //Notify user and campaign organoser
    } else if (req.params.status == "Cancelled") {
        //Notify user and campaign organiser
    }
    // processRequest(req, res);
});


// POST('/:id/vote') - Add's a Contributor's Vote for a Particular Request for a Particular Campaign
router.post('/:id/vote', cpUpload, (req, res) => {
    const { userId, vote } = req.body;
    console.log(req.body);
    Campaign.findById(req.params.id).then(campaign => {
        if (vote === 'true')
            campaign.currentVote.yes.push(userId);
        else if (vote === 'false')
            campaign.currentVote.no.push(userId);

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
router.post('/:id/donate', cpUpload, (req, res) => {
    const { userId, amount } = req.body;
    console.log(req.body);
    const donationAmount = amount * Math.pow(10, 18);

    Campaign.findById(req.params.id).then(campaign => {
        const donor = campaign.donors.findIndex(donors => donors.userId == userId);
        if (donor === -1) {
            const newDonor = {
                userId,
                donationAmount,
                donationDate: new Date(Date.now())
            }
            campaign.donors.push(newDonor);
        } else {
            campaign.donors[donor].donationAmount += donationAmount;
            campaign.donors[donor].donationDate = new Date(Date.now());
        }
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

// Get campaigns with currently running request and with deadline within next 36hrs
// GET('/request/end') - Let a Contributor gets added to the Donors List and Interact with Smart Contract to add Donation amount
router.get('/request/end', (req, res)=> {
    Campaign.find({"campaignRequest.deadline": {$lt:new Date(Date.now()+1.5*24*60*60*1000)}}).then(
        campaigns => {
            res.status(200).json(campaigns)
        }
    ).catch(
        error => res.status(400).json({ msg: 'Error Fetching Campaigns: ' + error })
    );
})


module.exports = router;