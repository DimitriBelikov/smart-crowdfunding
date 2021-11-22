const express = require('express');
const router = express.Router();

//Campaign model
const Campaign = require('../models/Campaign');


// GET('/') - Get list of all Campaigns
router.get("/", (req, res) => {
    Campaign.find().then(
        campaigns => res.json(campaigns)
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
            res.json(campaignObject);
        }
    ).catch(
        err => console.log("Error while creating new Campaign: " + err)
    );
})


// GET('/:id') - Get Details of a Particular Campaign



// PATCH('/:id') - Update a Particular Campaign



// DELETE('/:id') - Delete a Particular Campaign



// POST('/:id/request') - Create a New Request for a particular Campaign



// PATCH('/:id/request/:rid') - Update Details of a particular Request for a Particular Campaign



// DELETE('/:id/request/:rid') - Delete Details of a particular Request for a Particular Campaign



// POST('/:id/vote') - Add's a Contributor's Vote for a Particular Request for a Particular Campaign



// POST('/:id/donate') - Let a Contributor gets added to the Donors List and Interact with Smart Contract to add Donation amount



module.exports = router;