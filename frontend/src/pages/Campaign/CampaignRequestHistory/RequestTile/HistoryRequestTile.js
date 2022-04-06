import React from 'react';
import ShowMoreText from "react-show-more-text";

//CSS
import '../CampaignRequestHistory.css';

const HistoryRequestTile = ({ request }) => {
    return <>
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
                        <ShowMoreText
                            lines={5}
                            more="Show more"
                            className="border border-success mx-auto p-1"
                            expanded={false}
                            expandByClick={true}
                            truncatedEndingComponent={"... "}
                        >
                            <p>{request.requestDescription}</p>
                        </ShowMoreText>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>Request Documents</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        {request.requestResources.map((document, index) => (
                            <div className="row border border-secondary m-1 p-1" key={index}>
                                <div className="col-md-1">
                                    <a href={`http://localhost:4545/${document.filePath}`} target='_blank' rel="noreferrer" download>
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" alt="File icon"/>
                                    </a>
                                </div>
                                <div className="col-md-8">
                                    <span>{document.filePath.split('/').pop()}</span>
                                </div>
                                <div className="col-md-3 text-right">
                                    <span>{document.fileSize}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-2 border border-success pt-5">
                <div className="row  mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>Request Status</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>{request.requestStatus}</h6>
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

export default HistoryRequestTile;