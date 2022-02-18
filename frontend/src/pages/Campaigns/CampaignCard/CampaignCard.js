import React from 'react';
import ShowMoreText from "react-show-more-text";
import { useNavigate } from 'react-router-dom';

//CSS
import './CampaignCard.css';

const CampaignCard = ({ campaign }) => {
    const navigate = useNavigate();

    const clickOnCard = () => {
        navigate(`/campaign/${campaign._id}`)
    }

    return (
        <>
            <div className="card">
                <img
                    className="card-img-top"
                    src={`http://localhost:4545/${campaign.campaignCoverMedia}`}
                    alt="Card image cap"
                    onClick={clickOnCard}
                />
                <div className="card-body">
                    <h5 className="card-title text-truncate">
                        {campaign.campaignName}
                    </h5>
                    <h6>{campaign.campaignCategory}</h6>
                    <ShowMoreText
                        lines={5}
                        more="Show more"
                        className="card-text-container h-40 border border-success mx-auto"
                        onClick={() => clickOnCard()}
                        expanded={false}
                        expandByClick={false}
                        truncatedEndingComponent={"... "}
                    >
                        <p className="card-text">{campaign.campaignDescription}</p>
                    </ShowMoreText>

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
                        <div className="row mt-2">
                            <div className="col border-1 border-top border-secondary">
                                <span className="d-inline-block mt-2">140 Days to go</span>
                            </div>
                            <div className="col border-1 border-top border-secondary">
                                <span className="d-inline-block mt-2">{campaign.campaignStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampaignCard;
