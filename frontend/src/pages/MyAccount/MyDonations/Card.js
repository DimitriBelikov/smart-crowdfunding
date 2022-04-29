import React from 'react';
import ShowMoreText from "react-show-more-text";
import { useNavigate } from 'react-router-dom';

//CSS
import './Card.css';

const Card = ({ campaign, donationAmount, donatedOn }) => {
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
                            <span className="donation-card-campaign-status-block font-weight-bold">{campaign.campaignStatus}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6 className='font-italic'>{campaign.campaignCategory}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right border-right border-dark">
                            <span className="raised-capital text-left font-weight-bold">Amount Donated</span>
                            <br />
                            <span className="raised-capital text-left">
                                {donationAmount / Math.pow(10, 18)} ETH
                            </span>
                        </div>
                        <div className="col-6 text-left">
                            <span className="raised-capital font-weight-bold">Donation Date</span>
                            <br />
                            <span className="raised-capital">
                                {donatedOn.split('T')[0]}
                            </span>
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
        // <>
        //     <div className="card my-card">
        //         <div className="card-body">
        //             <h5 className="card-title text-truncate">
        //                 {campaign.campaignName}
        //             </h5>
        //             <div className="row">
        //             <div className="col">
        //             <h6>{campaign.campaignCategory}</h6>
        //             </div>
        //             <div className="col">
        //             <h6 className="text-right">{campaign.campaignStatus}</h6>
        //             </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col border-1 border-right border-secondary border-top">
        //                     <span className="raised-capital text-left">Amount Donated</span>
        //                     <br />
        //                     <span className="raised-capital text-left">
        //                         {donationAmount / Math.pow(10, 18)} ETH
        //                     </span>
        //                 </div>
        //                 <div className="col border-secondary border-top">
        //                     <span className="raised-capital">Donated On</span>
        //                     <br />
        //                     <span className="raised-capital">
        //                         {donatedOn.split('T')[0]}
        //                     </span>
        //                 </div>
        //             </div>

        //             <div className="progress mt-3">
        //                 <div
        //                     className="progress-bar"
        //                     role="progressbar"
        //                     aria-valuenow="60"
        //                     aria-valuemin="0"
        //                     aria-valuemax="100"
        //                     style={{
        //                         width: `${Math.round((campaign.amountCollected / campaign.requiredFunding) * 100)}%`
        //                     }}
        //                 ></div>
        //                 <span className="progress-completed text-black">
        //                     {Math.round((campaign.amountCollected / campaign.requiredFunding) * 100)}%
        //                 </span>
        //             </div>

        //             <div className="container-fluid mt-2">
        //                 <div className="row">
        //                     <div className="col border-1 border-right border-secondary border-top">
        //                         <span className="raised-capital text-left">Raised Funds</span>
        //                         <br />
        //                         <span className="raised-capital text-left">
        //                             {campaign.amountCollected / Math.pow(10, 18)} ETH
        //                         </span>
        //                     </div>
        //                     <div className="col border-secondary border-top">
        //                         <span className="raised-capital">Required Funds</span>
        //                         <br />
        //                         <span className="raised-capital">
        //                             {campaign.requiredFunding / Math.pow(10, 18)} ETH
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
};

export default Card;
