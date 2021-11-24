const express = require('express');
const router = express.Router();

//Campaign model
const Campaign = require('../models/Campaign');


// GET('/') - Get list of all Campaigns
router.get("/", (req, res) => {
    Campaign.find().then(
        campaigns => res.status(200).json(campaigns)
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
        err => console.log("Error while creating new Campaign: " + err)
    );
})


// GET('/:id') - Get Details of a Particular Campaign
router.get('/:id', (req,res) => {
    Campaign.findById(req.params.id).then(
        campaignData => res.status(200).json(campaignData)
    ).catch(
        err => console.log('Details Fetch Error : '+ err)
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
        if (error) console.log(error);
        res.status(200).json(response);
    });
});


// DELETE('/:id') - Delete a Particular Campaign
router.delete('/:id', (req, res) => {
    Campaign.findByIdAndDelete(req.params.id, (error, response) => {
        if (error) console.log(error);
        res.status(200).json(response);
    });
});


// POST('/:id/request') - Create a New Request for a particular Campaign
router.post('/:id/request', (req, res) => {
    const {requestNumber, requestTitle, requestDescription, requestResources} = req.body;

    const newRequest = {
        campaignRequest: {
            requestNumber,
            requestTitle,
            requestDescription,
            requestResources
        }
    }

    Campaign.findByIdAndUpdate(req.params.id, newRequest, {returnDocument:'after'}, (error, response)=>{
        if (error) res.send(400).json({msg: 'Error Creating a New Request'});
        res.status(200).json(response);
    });
});


// PUT('/:id/request/:rid') - Update Details of a particular Request for a Particular Campaign
router.put('/:id/request/:rid', (req, res)=> {
    
});


// DELETE('/:id/request/:rid') - Delete Details of a particular Request for a Particular Campaign



// POST('/:id/vote') - Add's a Contributor's Vote for a Particular Request for a Particular Campaign



// POST('/:id/donate') - Let a Contributor gets added to the Donors List and Interact with Smart Contract to add Donation amount



module.exports = router;