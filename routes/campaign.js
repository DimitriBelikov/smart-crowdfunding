const express = require('express');
const router = express.Router();

//Campaign model
const Campaign = require('../models/Campaign');

//Get all Campaigns
router.get("/", (req, res) => {
    Campaign.find().then(
        campaigns => res.json(campaigns)
    );
});

//Create a new Campaign
//619b3e236135cd4fab42cd64
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

module.exports = router;