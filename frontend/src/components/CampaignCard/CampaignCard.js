import React from 'react';

//CSS
import './CampaignCard.css';

const CampaignCard = ({ body, title }) => {
    return <>
        <div className="card">
            <img className="card-img-top" src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title text-truncate">{title}</h5>
                <div className='card-text-container h-50 pb-2 border border-success overflow-hidden'>
                    <p className="card-text">{body.substring(0, 300)} ...Read More</p>
                </div>

                <div className="progress mt-3">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "95%" }}></div>
                    <span className="progress-completed text-black">95%</span>
                </div>

                <div className="container-fluid mt-2">
                    <div className="row">
                        <div className="col border-1 border-right border-secondary border-top">
                            <span className='raised-capital text-left'>Raised Funds</span><br />
                            <span className='raised-capital text-left'>50,000 ETH</span>
                        </div>
                        <div className="col border-secondary border-top">
                            <span className='raised-capital'>Required Funds</span><br />
                            <span className='raised-capital'>20,000 ETH</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CampaignCard;
