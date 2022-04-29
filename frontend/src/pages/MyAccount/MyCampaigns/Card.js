import React from 'react';
import ShowMoreText from "react-show-more-text";
import { useNavigate } from 'react-router-dom';

//CSS
import './Card.css';

const Card = ({ campaign }) => {
    const navigate = useNavigate();

    const redirectToCampaign = () => {
        navigate(`/campaign/${campaign._id}`)
    }

    return (
        <>
            <div className="card my-card ml-2 mr-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-11 card-title-container" onClick={() => redirectToCampaign()}>
                            <h5 className="card-title text-truncate mb-0">
                                {campaign.campaignName}
                            </h5>
                        </div>
                        <div className="col-1">
                            <span className="card-campaign-status-block font-weight-bold">{campaign.campaignStatus}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6 className='font-italic'>{campaign.campaignCategory}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col p-0 pl-3 pr-2">
                            <ShowMoreText
                                lines={5}
                                more="Show more"
                                className="card-text-container h-40 mx-auto"
                                expanded={false}
                                expandByClick={false}
                                truncatedEndingComponent={"... "}
                            >
                                {campaign.campaignDescription}
                            </ShowMoreText>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="progress mt-3 mb-3">
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    aria-valuenow="60"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{
                                        width: `${Math.round(
                                            (campaign.amountCollected / campaign.requiredFunding) * 100
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="float-left">
                                <h6 style={{ "font-weight": "bold" }}>
                                    {campaign.amountCollected / Math.pow(10, 18)} ETH
                                </h6>
                                <h6 style={{ "font-weight": "bold", "font-size": "14px" }}>
                                    raised of {campaign.requiredFunding / Math.pow(10, 18)} ETH
                                </h6>
                            </div>
                            <div className="float-right">
                                <h6 style={{ "font-weight": "bold" }}>
                                    {Math.round(
                                        (campaign.amountCollected / campaign.requiredFunding) * 100
                                    )}
                                    %
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
