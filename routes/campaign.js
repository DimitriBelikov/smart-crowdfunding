const express = require('express');
const router = express.Router();

//Campaign model
const Campaign = require('../models/Campaign');

// GET('/') - Get list of all Campaigns
router.get("/", (req, res) => {
    Campaign.find().then(
        campaigns => res.status(200).json(campaigns)
    ).catch(
        error => res.status(400).json({msg: 'Error Fetching Campaigns: '+ error})
    );
});


// POST('/') - Create a new Campaign
router.post("/", (req, res) => {
    const {campaignName, campaignDescription, campaignOrganiser, requiredFunding} = req.body;

    const campaign = new Campaign({
        campaignName,
        campaignDescription,
        campaignOrganiser,
        requiredFunding
    });

    campaign.save().then(
        campaignObject => {
            console.log('--> New Campaign Created. Document Saved on Database.');
            res.status(200).json(campaignObject);
        }
    ).catch(
        error => res.status(400).json({msg: "Error while creating new Campaign: " + error})
    );
})


// GET('/:id') - Get Details of a Particular Campaign
router.get('/:id', (req,res) => {
    Campaign.findById(req.params.id).then(
        campaignData => res.status(200).json(campaignData)
    ).catch(
        error => res.status(400).json({msg: 'Error Fetching Campaign Details: ' + error})
    );
});


// PUT('/:id') - Update a Particular Campaign
router.put('/:id', (req, res) => {
    const {campaignName, campaignDescription, campaignOrganiser, requiredFunding} = req.body;

    const updatedCampaign = {
        campaignName,
        campaignDescription,
        campaignOrganiser,
        requiredFunding
    };

    Campaign.findByIdAndUpdate(req.params.id, updatedCampaign, {returnDocument:'after'}, (error, response)=> {
        if (error) res.status(400).json({msg: 'Error Updating Campaign Details: '+ error});
        res.status(200).json(response);
    });
});


// DELETE('/:id') - Delete a Particular Campaign
router.delete('/:id', (req, res) => {
    Campaign.findByIdAndDelete(req.params.id, (error, response) => {
        if (error) res.status(400).json({msg: 'Error Deleting Campaign: '+ error});
        res.status(200).json(response);
    });
});

// Common Function for POST and PATCH for /:id/request and /:id/request/current
const campaignRequestAPI = (req, res, msg) => {
    const {requestNumber, requestTitle, requestDescription, requestResources} = req.body;

    const request = {
        campaignRequest: {
            requestNumber,
            requestTitle,
            requestDescription,
            requestResources
        }
    }

    Campaign.findByIdAndUpdate(req.params.id, request, {returnDocument:'after'}, (error, response)=>{
        if (error) res.status(400).json({msg: msg + error});
        res.status(200).json(response);
    });
}

// POST('/:id/request') - Create a New Request for a particular Campaign
router.post('/:id/request', (req, res) => {
    campaignRequestAPI(req, res, 'Error Creating a new Request: ');
});


// PUT('/:id/request/current') - Update Details of a current Request for a Particular Campaign
router.put('/:id/request/current', (req, res)=> {
    campaignRequestAPI(req, res, 'Error Updating the current Request: ');
});


// DELETE('/:id/request/current') - Delete Details of a current Request for a Particular Campaign
router.delete('/:id/request/current', (req, res) => {
    Campaign.findById(req.params.id).then(campaign => {
        const request = {
            requestNumber: campaign.campaignRequest.requestNumber,
            requestTitle: campaign.campaignRequest.requestTitle,
            requestDescription: campaign.campaignRequest.requestDescription,
            requestResources: campaign.campaignRequest.requestResources,
            upVotePercentage: 0.0,
            campaignStatus: 'Cancelled'
        }

        campaign.campaignRequest = {"requestResources": []}
        campaign.requestVotingHistory.push(request);

        Campaign.findByIdAndUpdate(req.params.id, campaign, {returnDocument:'after'}, (error, response)=>{
            if (error) res.status(400).json({msg: 'Error Deleting Request: '+ error});
            res.status(200).json(response);
        });
    }).catch(
        error => res.status(400).json({msg: "Error Fetching Campaign Details: "+ error})
    );
});


// POST('/:id/vote') - Add's a Contributor's Vote for a Particular Request for a Particular Campaign
router.post('/:id/vote', (req, res) => {
    
    const {yes, no} = req.body;
    const vote = {
        currentVote: {
            yes,
            no
        }
    }
    Campaign.findByIdAndUpdate(req.params.id, vote, {returnDocument:'after'}, (error, response)=>{
        if (error) res.status(400).json({error});
        res.status(200).json(response);
    });
    
});


// POST('/:id/donate') - Let a Contributor gets added to the Donors List and Interact with Smart Contract to add Donation amount
router.post('/:id/donor', (req, res) => {
    Campaign.findById(req.params.id).then(campaign => {

        const donorDetails = {
            donors:{
                userId: req.body.userId,
                donationAmount: req.body.donationAmount,
                donationDate: req.body.donationDate
            }
        }
        // donorDetails.date instanceof Date;
        // campaign.donors.push(donorDetails);

        Campaign.findByIdAndUpdate(req.params.id, {$push: donorDetails}, {returnDocument:'after'}, (error, response)=>{
            if (error) res.status(400).json({msg: 'Error Voting: '+ error});
            res.status(200).json(response);
        });
    }).catch(
        error => res.status(400).json({msg: "Error Fetching Campaign Details: "+ error})
    );
});




module.exports = router;