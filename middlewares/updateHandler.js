//Models
const Campaign = require('../models/Campaign');

// Static Data
const { updateData } = require('../config/updateConfig');

const updateHandler = (req, res) => {
    const { updateAreas } = req;
    var updateDescription = [], updateTitle;

    if (updateAreas != undefined) {
        updateAreas.forEach((updateArea) => {
            console.log(updateArea);
            switch (updateArea) {
                case 'Documents':
                    updateDescription.push(updateData.Documents.description);
                    updateTitle = updateData.Documents.title;
                    break;
                case 'Description':
                    updateDescription.push(updateData.Description.description);
                    updateTitle = updateData.Description.title;
                    break;
                case 'RequestUpdated':
                    updateDescription.push(updateData.RequestUpdated.description);
                    updateTitle = updateData.RequestUpdated.title;
                    break;
                case 'RequestCreated':
                    updateDescription.push(updateData.RequestCreated.description);
                    updateTitle = updateData.RequestCreated.title;
                    break;
                case 'RequestDeleted':
                    updateDescription.push(updateData.RequestDeleted.description);
                    updateTitle = updateData.RequestDeleted.title;
                    break;
                case 'RequestCompleted':
                    updateDescription.push(updateData.RequestCompleted.description);
                    updateTitle = updateData.RequestCompleted.title;
                    break;
            }
        });

        const update = {
            updateTitle,
            updateDescription,
            updateDate: new Date(Date.now())
        }

        Campaign.findById(req.params.id).then(
            campaign => {
                campaign.updates.push(update);
                Campaign.findByIdAndUpdate(req.params.id, campaign, { returnDocument: 'after' }, (error, response) => {
                    if (error) console.log(error);
                    console.log(response);
                });
            }
        ).catch(
            error => console.log(error)
        );
    }
}

module.exports = updateHandler;