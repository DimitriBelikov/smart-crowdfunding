import React from 'react';

const CampaignUpdates = ({ updates }) => {
    return <>
        <div className="container border border-primary">
            {[...updates].reverse().map((update, index) => (
                <li className='border border-secondary m-3' style={{ listStyleType: 'none' }} key={index}>
                    <div class="row">
                        <div class="col-md-9">
                            <h5>{update.updateTitle}</h5>
                        </div>
                        <div class="col-md-3 text-right">
                            <h6>{update.updateDate.split('.')[0].replace('T', ' ')}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h8>Campaign Organiser</h8>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <ul>
                                {update.updateDescription.map((description) => (
                                    <li>{description}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </li>
            ))}
        </div >
    </>
}

export default CampaignUpdates;