import React, { useState, useEffect } from 'react';

const CampaignForm = () => {
    const [campaign, setCampaign] = useState({
        campaignName: '',
        campaignDescription: '',
        campaignCategory: 'Education',
        requiredFunding: 0,
        campaignCoverMedia: [],
        campaignResources: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'campaignResources' || name === 'campaignCoverMedia') {
            console.log('Inside if');
            setCampaign({ ...campaign, [name]: Array.from(e.target.files) });
        }
        else {
            console.log('Inside else');
            setCampaign({ ...campaign, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('campaignCoverMedia', campaign.campaignCoverMedia[0]);
        for (var i = 0; i < campaign.campaignResources.length; i++)
            formData.append('campaignResources', campaign.campaignResources[i]);
        formData.append('campaignName', campaign.campaignName);
        formData.append('campaignDescription', campaign.campaignDescription);
        formData.append('campaignCategory', campaign.campaignCategory);
        formData.append('requiredFunding', campaign.requiredFunding);

        const requestOptions = {
            method: 'POST',
            body: formData
        };

        const response = await fetch('http://localhost:4545/api/campaign', requestOptions);
        const result = await response.json();

        console.log(result);
    }

    return <>
        <h1 className='text-center'>Create a Campaign</h1>
        <div className='container'>
            <form>
                <div className="form-group">
                    <label htmlFor="campaign-name">Campaign Name</label>
                    <input type="text" className="form-control" id="campaign-name" name='campaignName' placeholder="Type in Campaign Name" value={campaign.campaignName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-description">Campaign Description</label>
                    <textarea className="form-control" id="campaign-description" rows="5" name='campaignDescription' placeholder="Type in Campaign Description" value={campaign.campaignDescription} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-category">Campaign Category</label>
                    <select className="form-control" id="campaign-category" name='campaignCategory' value={campaign.campaignCategory} onChange={handleChange}>
                        <option>Education</option>
                        <option>Medical</option>
                        <option>Rights</option>
                        <option>Disaster Relief</option>
                        <option>Animal Care</option>
                        <option>Environment</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="total-funding">Total Funding Needed</label>
                    <input type="number" className="form-control" id="campaign-name" name='requiredFunding' placeholder="Enter Total Funding Needed" min={1} value={campaign.requiredFunding === 0 ? null : campaign.requiredFunding} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-cover-image">Campaign Cover Image</label><br />
                    <input type="file" id="campaign-cover-image" name="campaignCoverMedia" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-resources">Campaign Resources</label> <br />
                    <input type="file" id="campaign-resources" name="campaignResources" multiple onChange={handleChange} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary align-center" type="submit" onClick={handleSubmit}>Create Campaign</button>
                </div>
            </form>
        </div>
    </>
}

export default CampaignForm;