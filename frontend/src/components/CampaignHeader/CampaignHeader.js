import React from 'react';

// Custom-CSS
import './CampaignHeader.css';

const CampaignHeader = ({coverImage}) => {
    return <>
        <div className='container-fluid border border-success campaign-header-image' style={{backgroundImage: `url(${coverImage})`}}>
            <div className='row p-2'>
                <div className="fadeshow col-md-6 col-lg-8 border border-danger">
                    <h2>Empty Space</h2>
                </div>
                <div className="col-md-6 col-lg-4 border border-danger p-1 h-50">
                    <div className="campaign-header border border-secondary rounded bg-warning">
                        <div className="container-fluid border border-success">
                            <div className="row">
                                <div className="col">
                                    <h6 className='text-right'>Status</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h2>Campaign Title</h2>
                                    <h6>Category</h6>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-4 border border-success">
                                    <h6 className='text-center'>Current Request Deadline</h6>
                                    <h6 className='text-center'>29 Days</h6>
                                </div>
                                <div className="col-md-4 border border-success">
                                    <h6 className='text-center'>Current Funds Requested</h6>
                                    <h6 className='text-center'>20 ETH</h6>
                                </div>
                                <div className="col-md-4 border border-success">
                                    <h6 className='text-center'>Total Funds Required</h6>
                                    <h6 className='text-center'>45 ETH</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h5 className='text-center mt-3'>Raised Funds: 25ETH</h5>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="progress mt-3 mb-3">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            aria-valuenow="78"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width: 78,
                                            }}
                                        ></div>
                                        <span className="progress-completed text-black">
                                            78%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CampaignHeader;