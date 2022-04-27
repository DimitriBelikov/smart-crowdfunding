import React from "react";
import ShowMoreText from "react-show-more-text";
import { useNavigate } from "react-router-dom";

//CSS
import "./CampaignCard.css";

const CampaignCard = ({ campaign }) => {
    const navigate = useNavigate();

    const clickOnCard = () => {
        navigate(`/campaign/${campaign._id}`);
    };

    return (
        <>
            <div className="card">
                <img
                    className="img-top"
                    src={`http://localhost:4545/${campaign.campaignCoverMedia}`}
                    alt="Campign Cover"
                    onClick={clickOnCard}
                />

                <div className="campaign-status-block">
                    {/* <h3 className="campaign-status-block">sacac</h3> */}
                    <h6 className="campaign-status-text">{campaign.campaignStatus}</h6>
                </div>

                <div className="card-body">
                    <h5 className="card-title text-truncate mb-2">
                        {campaign.campaignName}
                    </h5>
                    <h6>{campaign.campaignCategory}</h6>
                    <ShowMoreText
                        lines={5}
                        more="Show more"
                        className="card-text-container"
                        onClick={() => clickOnCard()}
                        expanded={false}
                        expandByClick={false}
                        truncatedEndingComponent={"... "}
                    >
                        <p className="card-text">{campaign.campaignDescription}</p>
                    </ShowMoreText>

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
                    <div classname="row">
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
        </>
    );
};

export default CampaignCard;
