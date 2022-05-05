import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jsonwebtoken from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

//Components
import RequestForm from "./RequestForm/RequestForm";
import UpdateCampaignForm from "./UpdateCampaignForm/UpdateCampaignForm";
import UpdateRequestForm from "./UpdateRequestForm/UpdateRequestForm";
import DonationForm from "./DonationForm/DonationForm";
import {
    ETHConnect,
    isMetamaskInstalled,
} from "../../../components/ETHConnect/ETHConnect";

//Controllers
import { useFetch } from "../../../controllers/useFetch";

// Custom-CSS
import "./CampaignHeader.css";

//AntD Components
import { Spin } from "antd";

const CampaignHeader = ({ campaignHeaderData }) => {
    const navigate = useNavigate();
    const { loading, data: userData } = useFetch(
        `http://localhost:4545/api/user/${campaignHeaderData.campaignOrganiser}`
    );
    const { ethereum } = window;
    const [user, setUser] = useState({});
    const [isUserCampaignOrganiser, setIsUserCampaignOrganiser] = useState(false);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showUpdateCampaignForm, setShowUpdateCampaignForm] = useState(false);
    const [showUpdateRequestForm, setShowUpdateRequestForm] = useState(false);
    const [showDonationForm, setShowDonationForm] = useState(false);
    const [showMetamaskConnect, setShowMetamaskConnect] = useState(false);

    useEffect(() => {
        const cookie = Cookies.get("jwt");
        const user = jsonwebtoken.decode(cookie);
        setUser(user);
        setIsUserCampaignOrganiser(
            user !== null && user.id === campaignHeaderData.campaignOrganiser
                ? true
                : false
        );

        if (ethereum !== undefined) {
            ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length == 0) window.location.reload();
                ethereum.account = accounts[0];
                console.log("Account Changed = ", accounts);
            });
            ethereum.on("chainChanged", (chainId) => {
                ethereum.chainId = chainId;
                window.location.reload();
            });
        }
    }, []);

    const handleShowRequestForm = () => {
        setShowRequestForm(true);
    };

    const handleCloseRequestForm = () => {
        setShowRequestForm(false);
    };

    const handleShowUpdateCampaignForm = () => {
        setShowUpdateCampaignForm(true);
    };

    const handleCloseUpdateCampaignForm = () => {
        setShowUpdateCampaignForm(false);
    };

    const handleShowUpdateRequestForm = () => {
        setShowUpdateRequestForm(true);
    };

    const handleCloseUpdateRequestForm = () => {
        setShowUpdateRequestForm(false);
    };

    const handleShowMetamaskConnect = () => {
        setShowMetamaskConnect(true);
    };

    const handleCloseMetamaskConnect = () => {
        setShowMetamaskConnect(false);
        setShowDonationForm(true);
    };

    const handleShowDonationForm = async () => {
        if (user === null) navigate("/login");
        else {
            // let isAccountConnected = await isAccountConnected();
            console.log(ethereum.account !== undefined);
            if (!isMetamaskInstalled() || !window.ethereum.isConnected() || !(ethereum.account !== undefined))
                handleShowMetamaskConnect();
            else {
                console.log(ethereum.account);
                setShowDonationForm(true);
            }
        }
    };

    const handleCloseDonationForm = () => {
        setShowDonationForm(false);
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            {console.log(user)}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-7 campaign-cover-container">
                        <img
                            className="campaign-cover pl-1 pr-1"
                            src={`http://localhost:4545/${campaignHeaderData.campaignCoverMedia}`}
                            alt="campaign cover"
                        />
                    </div>
                    <div className="col-5">
                        <div className="row">
                            <div className="col">
                                <h2 className="font-weight-bold">
                                    {campaignHeaderData.campaignName}
                                </h2>
                            </div>
                        </div>
                        <div className="row ml-1">
                            <div className="col-1 p-0">
                                <img
                                    src="http://localhost:3000/user.png"
                                    alt="user-icon"
                                    width={36}
                                    height={36}
                                    className="mt-1 mb-1"
                                />
                            </div>
                            <div className="col-11">
                                <div className="row">
                                    &nbsp;&nbsp;By&nbsp;
                                    <span className="text-success font-weight-bold">
                                        {userData.userName}
                                    </span>
                                </div>
                                <div className="row">
                                    &nbsp;&nbsp;{userData.createdCampaigns.length} Campaign
                                    Created&nbsp;&nbsp;|&nbsp;&nbsp;{userData.currentCity},{" "}
                                    {userData.state}
                                </div>
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
                                                (campaignHeaderData.amountCollected /
                                                    campaignHeaderData.requiredFunding) *
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="float-left">
                                    <h5 style={{ "font-weight": "bold" }}>
                                        {campaignHeaderData.amountCollected / Math.pow(10, 18)} ETH
                                        <span style={{ "font-weight": "100", "font-size": "16px" }}>
                                            &nbsp;raised of
                                            {campaignHeaderData.requiredFunding / Math.pow(10, 18)}
                                            &nbsp;ETH
                                        </span>
                                    </h5>
                                </div>
                                <div className="float-right">
                                    <h6 style={{ "font-weight": "bold" }}>
                                        {Math.round(
                                            (campaignHeaderData.amountCollected /
                                                campaignHeaderData.requiredFunding) *
                                            100
                                        )}
                                        %
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <hr width="100%" className="mt-2 mb-2" />
                        <div className="row mt-1 ml-1">
                            <div className="col-6 p-0">
                                <img
                                    src={`http://localhost:3000/logos/categories/${campaignHeaderData.campaignCategory}.png`}
                                    alt="category-icon"
                                    width={20}
                                    height={20}
                                />
                                &nbsp;&nbsp;
                                <h6
                                    style={{ display: "inline-block" }}
                                    className="font-weight-bold"
                                >
                                    {campaignHeaderData.campaignCategory}
                                </h6>
                            </div>
                            <div className="col-6 p-0 pr-3 text-right">
                                <img
                                    src={`http://localhost:3000/donors.png`}
                                    alt="category-icon"
                                    width={20}
                                    height={20}
                                />
                                &nbsp;&nbsp;
                                <h6
                                    style={{ display: "inline-block" }}
                                    className="font-weight-bold"
                                >
                                    {campaignHeaderData.donors.length} Backers
                                </h6>
                            </div>
                        </div>
                        <hr width="100%" className="mt-2 mb-2" />
                        <div className="row text-center">
                            <div className="col mt-2 mb-2">
                                {campaignHeaderData.amountCollected <
                                    campaignHeaderData.requiredFunding &&
                                    (user === null || !isUserCampaignOrganiser) ? (
                                    <button
                                        type="button"
                                        className="btn btn-custom font-weight-bold"
                                        onClick={handleShowDonationForm}
                                    >
                                        Donate Now
                                    </button>
                                ) : null}

                                {isUserCampaignOrganiser ? (
                                    campaignHeaderData.campaignRequest.requestTitle == null ? (
                                        <button
                                            type="button"
                                            className="btn btn-custom font-weight-bold mr-2"
                                            onClick={handleShowRequestForm}
                                        >
                                            Create Request
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-custom font-weight-bold mr-2"
                                            onClick={handleShowUpdateRequestForm}
                                        >
                                            Update Request
                                        </button>
                                    )
                                ) : null}

                                {isUserCampaignOrganiser && (
                                    <button
                                        type="button"
                                        className="btn btn-custom font-weight-bold ml-2"
                                        onClick={handleShowUpdateCampaignForm}
                                    >
                                        Update Campaign
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container border border-success">
                <div
                    className="row p-2 border border-secondary campaign-header-image"
                    style={{
                        backgroundImage: `url("http://localhost:4545/${campaignHeaderData.campaignCoverMedia}")`,
                    }}
                >
                    <div className="fadeshow col-md-6 col-lg-8 border border-danger">
                        <h2>Empty Space</h2>
                    </div>
                    <div className="col-md-6 col-lg-4 border border-danger p-1 h-50">
                        <div className="campaign-header border border-secondary rounded bg-warning">
                            <div className="container-fluid border border-success">
                                <div className="row">
                                    <div className="col">
                                        <h6 className="text-right">
                                            {campaignHeaderData.campaignStatus}
                                        </h6>
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
                                        <h6 className="text-center">Campaign Deadline</h6>
                                        <h6 className="text-center">29 Days</h6>
                                    </div>
                                    <div className="col border border-success">
                                        <h6 className="text-center">Total Funds Required</h6>
                                        <h6 className="text-center">
                                            {campaignHeaderData.requiredFunding / Math.pow(10, 18)}{" "}
                                            ETH
                                        </h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <h5 className="text-center mt-3">
                                            Raised Funds:{" "}
                                            {campaignHeaderData.amountCollected / Math.pow(10, 18)}{" "}
                                            ETH
                                        </h5>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="progress mt-3 mb-3">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow={`${Math.round(
                                                    (campaignHeaderData.amountCollected /
                                                        campaignHeaderData.requiredFunding) *
                                                    100
                                                )}`}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                    width: `${Math.round(
                                                        (campaignHeaderData.amountCollected /
                                                            campaignHeaderData.requiredFunding) *
                                                        100
                                                    )}%`,
                                                }}
                                            ></div>
                                            <span className="progress-completed text-black">
                                                {Math.round(
                                                    (campaignHeaderData.amountCollected /
                                                        campaignHeaderData.requiredFunding) *
                                                    100
                                                )}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center mb-3">
                                        {campaignHeaderData.amountCollected <
                                            campaignHeaderData.requiredFunding &&
                                            (user === null || !isUserCampaignOrganiser) ? (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={handleShowDonationForm}
                                            >
                                                Donate Now
                                            </button>
                                        ) : null}

                                        {isUserCampaignOrganiser ? (
                                            campaignHeaderData.campaignRequest.requestTitle ==
                                                null ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={handleShowRequestForm}
                                                >
                                                    Create Request
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={handleShowUpdateRequestForm}
                                                >
                                                    Update Request
                                                </button>
                                            )
                                        ) : null}

                                        {isUserCampaignOrganiser && (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleShowUpdateCampaignForm}
                                            >
                                                Update Campaign
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <RequestForm
                show={showRequestForm}
                handleClose={handleCloseRequestForm}
                requestNumber={campaignHeaderData.requestVotingHistory.length + 1}
                campaignId={campaignHeaderData._id}
                amountCollected={campaignHeaderData.amountCollected}
                amountDisbursed={campaignHeaderData.amountDisbursed}
            />
            <UpdateCampaignForm
                show={showUpdateCampaignForm}
                handleClose={handleCloseUpdateCampaignForm}
                campaignData={campaignHeaderData}
            />
            <UpdateRequestForm
                show={showUpdateRequestForm}
                handleClose={handleCloseUpdateRequestForm}
                requestData={campaignHeaderData.campaignRequest}
                campaignId={campaignHeaderData._id}
            />
            <DonationForm
                show={showDonationForm}
                handleClose={handleCloseDonationForm}
                campaignId={campaignHeaderData._id}
                campaignName={campaignHeaderData.campaignName}
                smartContractAddress={campaignHeaderData.smartContractAddress}
                amountCollected={campaignHeaderData.amountCollected}
                requiredFunding={campaignHeaderData.requiredFunding}
            />
            <ETHConnect
                show={showMetamaskConnect}
                handleClose={handleCloseMetamaskConnect}
            />
        </>
    );
};

export default CampaignHeader;
