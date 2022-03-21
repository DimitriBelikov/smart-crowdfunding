import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

//Components
import RequestForm from './RequestForm/RequestForm';
import UpdateCampaignForm from './UpdateCampaignForm/UpdateCampaignForm';
import UpdateRequestForm from './UpdateRequestForm/UpdateRequestForm';
import DonationForm from './DonationForm/DonationForm';

// Custom-CSS
import './CampaignHeader.css';

const CampaignHeader = ({ campaignHeaderData }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isUserCampaignOrganiser, setIsUserCampaignOrganiser] = useState(false);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showUpdateCampaignForm, setShowUpdateCampaignForm] = useState(false);
    const [showUpdateRequestForm, setShowUpdateRequestForm] = useState(false);
    const [showDonationForm, setShowDonationForm] = useState(false);



    useEffect(() => {
        const cookie = Cookies.get('jwt');
        const user = jsonwebtoken.decode(cookie);
        setUser(user);
        setIsUserCampaignOrganiser(user !== null && user.id === campaignHeaderData.campaignOrganiser ? true : false);
    }, [])

    const handleShowRequestForm = () => {
        setShowRequestForm(true);
    }

    const handleCloseRequestForm = () => {
        setShowRequestForm(false);
    }

    const handleShowUpdateCampaignForm = () => {
        setShowUpdateCampaignForm(true);
    }

    const handleCloseUpdateCampaignForm = () => {
        setShowUpdateCampaignForm(false);
    }

    const handleShowUpdateRequestForm = () => {
        setShowUpdateRequestForm(true);
    }

    const handleCloseUpdateRequestForm = () => {
        setShowUpdateRequestForm(false);
    }

    const handleShowDonationForm = () => {
        (user === null) ? navigate('/login') : setShowDonationForm(true);
    }

    const handleCloseDonationForm = () => {
        setShowDonationForm(false);
    }

    return <>
        {console.log(user)}
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
                                    {(user === null || !isUserCampaignOrganiser) ? <button type="button" className="btn btn-success" onClick={handleShowDonationForm}>Donate Now</button> : null}

                                    {isUserCampaignOrganiser ? campaignHeaderData.campaignRequest.requestTitle == null ?
                                        <button type="button" className="btn btn-primary" onClick={handleShowRequestForm} >Create Request</button>
                                        : <button type="button" className="btn btn-primary" onClick={handleShowUpdateRequestForm}>Update Request</button>
                                        : null
                                    }

                                    {isUserCampaignOrganiser && <button type="button" className="btn btn-danger" onClick={handleShowUpdateCampaignForm}>Update Campaign</button>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RequestForm show={showRequestForm} handleClose={handleCloseRequestForm} requestNumber={campaignHeaderData.requestVotingHistory.length + 1} campaignId={campaignHeaderData._id} />
        <UpdateCampaignForm show={showUpdateCampaignForm} handleClose={handleCloseUpdateCampaignForm} campaignData={campaignHeaderData} />
        <UpdateRequestForm show={showUpdateRequestForm} handleClose={handleCloseUpdateRequestForm} requestData={campaignHeaderData.campaignRequest} campaignId={campaignHeaderData._id} />
        <DonationForm show={showDonationForm} handleClose={handleCloseDonationForm} campaignId={campaignHeaderData._id} campaignName={campaignHeaderData.campaignName} smartContractAddress={campaignHeaderData.smartContractAddress} />
    </>
};

export default CampaignHeader;