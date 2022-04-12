import React from 'react';
import ShowMoreText from "react-show-more-text";
import { useNavigate } from 'react-router-dom';

//CSS
import './Card.css';

const Card = ({ campaign, donationAmount, donatedOn }) => {
    const navigate = useNavigate();

    const clickOnCard = () => {
        navigate(`/campaign/${campaign._id}`)
    }

    return (
        <>
            <div className="card my-card">
                <div className="card-body">
                    <h5 className="card-title text-truncate">
                        {campaign.campaignName}
                    </h5>
                    <div className="row">
                    <div className="col">
                    <h6>{campaign.campaignCategory}</h6>
                    </div>
                    <div className="col">
                    <h6 className="text-right">{campaign.campaignStatus}</h6>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col border-1 border-right border-secondary border-top">
                            <span className="raised-capital text-left">Amount Donated</span>
                            <br />
                            <span className="raised-capital text-left">
                                {donationAmount / Math.pow(10, 18)} ETH
                            </span>
                        </div>
                        <div className="col border-secondary border-top">
                            <span className="raised-capital">Donated On</span>
                            <br />
                            <span className="raised-capital">
                                {donatedOn.split('T')[0]}
                            </span>
                        </div>
                    </div>

                    <div className="progress mt-3">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: `${Math.round((campaign.amountCollected / campaign.requiredFunding) * 100)}%`
                            }}
                        ></div>
                        <span className="progress-completed text-black">
                            {Math.round((campaign.amountCollected / campaign.requiredFunding) * 100)}%
                        </span>
                    </div>

                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col border-1 border-right border-secondary border-top">
                                <span className="raised-capital text-left">Raised Funds</span>
                                <br />
                                <span className="raised-capital text-left">
                                    {campaign.amountCollected / Math.pow(10, 18)} ETH
                                </span>
                            </div>
                            <div className="col border-secondary border-top">
                                <span className="raised-capital">Required Funds</span>
                                <br />
                                <span className="raised-capital">
                                    {campaign.requiredFunding / Math.pow(10, 18)} ETH
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
