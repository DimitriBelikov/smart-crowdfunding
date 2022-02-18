import React from 'react';

//CSS
import '../CampaignRequestHistory.css';

const CurrentRequestTile = ({ request }) => {
    return <>
        {console.log(request.requestResources)}
        <div className="row m-3">
            <div className="col-md-1 d-flex align-items-center text-center border border-success">
                <h4 className='p-4'>{request.requestNumber}</h4>
            </div>
            <div className="col-md-9 border border-success">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{request.requestTitle}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>{request.requestDescription}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>Request Documents</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {request.requestResources.map((document, index) => {
                            return <button className='m-2' key={index}>
                                <a href={`http://localhost:4545/${document.filePath}`} target='_blank' download>
                                    <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                </a>
                            </button>
                        })}

                    </div>
                </div>
            </div>
            <div className="col-md-2 border border-success pt-5">
                <div className="row  mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>Request Status</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>Active</h6>
                    </div>
                </div>
                <div className="row mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>Request Amount</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>{request.requestAmount / Math.pow(10, 18)} ETH</h6>
                    </div>
                </div>
                <div className="row mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>upVote Percentage</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>{request.upVotePercentage.$numberDecimal} %</h6>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CurrentRequestTile;