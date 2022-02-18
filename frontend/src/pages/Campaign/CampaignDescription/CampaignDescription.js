import React from 'react';

const CampaignDescription = ({ campaignDescription }) => {
    return <>
        <div className="container">
            <div className="row">
                <div className="col text-justify mt-3">
                    <p>{campaignDescription}</p>
                </div>
            </div>
        </div>
    </>;
};

export default CampaignDescription;
