import React, { useState } from 'react';


//Components
import RequestForm from './RequestForm/RequestForm';

// Custom-CSS
import './CampaignHeader.css';

const CampaignHeader = ({ campaignHeaderData }) => {
    const [showRequestForm, setShowRequestForm] = useState(false);

    const handleShow = () => {
        setShowRequestForm(true);
    }

    const handleClose = () => {
        setShowRequestForm(false);
    }

    return <>
        <div className='container-fluid border border-success'>
            <div className='row p-2 border border-secondary campaign-header-image' style={{ backgroundImage: `url("http://localhost:4545/${campaignHeaderData.campaignCoverMedia}")` }}>
                <div className="fadeshow col-md-6 col-lg-8 border border-danger">
                    <h2>Empty Space</h2>
                </div>
                <div className="col-md-6 col-lg-4 border border-danger p-1 h-50">
                    <div className="campaign-header border border-secondary rounded bg-warning">
                        <div className="container-fluid border border-success">
                            <div className="row">
                                <div className="col">
                                    <h6 className='text-right'>{campaignHeaderData.campaignStatus}</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h2>{campaignHeaderData.campaignName}</h2>
                                    <h6>{campaignHeaderData.campaignCategory}</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col border border-success">
                                    <h6 className='text-center'>Campaign Deadline</h6>
                                    <h6 className='text-center'>29 Days</h6>
                                </div>
                                <div className="col border border-success">
                                    <h6 className='text-center'>Total Funds Required</h6>
                                    <h6 className='text-center'>{campaignHeaderData.requiredFunding / Math.pow(10, 18)} ETH</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h5 className='text-center mt-3'>Raised Funds: {campaignHeaderData.amountCollected / Math.pow(10, 18)} ETH</h5>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="progress mt-3 mb-3">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            aria-valuenow={`${Math.round((campaignHeaderData.amountCollected / campaignHeaderData.requiredFunding) * 100)}`}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width: `${Math.round((campaignHeaderData.amountCollected / campaignHeaderData.requiredFunding) * 100)}%`
                                            }}
                                        ></div>
                                        <span className="progress-completed text-black">
                                            {Math.round((campaignHeaderData.amountCollected / campaignHeaderData.requiredFunding) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center mb-3">
                                    <button type="button" className="btn btn-success">Donate Now</button>
                                    {campaignHeaderData.campaignRequest.requestTitle == null ?
                                        <button type="button" className="btn btn-primary" onClick={handleShow} >Create Request</button> :
                                        <button type="button" className="btn btn-secondary" onClick={handleShow} disabled>Create Request</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RequestForm show={showRequestForm} handleClose={handleClose} requestNumber={campaignHeaderData.requestVotingHistory.length + 1} campaignId={campaignHeaderData._id} />
    </>
};

export default CampaignHeader;