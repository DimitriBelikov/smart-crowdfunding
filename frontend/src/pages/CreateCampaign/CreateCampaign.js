import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jsonwebtoken from "jsonwebtoken";

// Components
import CampaignForm from "./CampaignForm/CampaignForm";
import Navigationbar from "../../components/Navigationbar/Navigationbar";
import { useNavigate } from "react-router-dom";
import {
    ETHConnect,
    isMetamaskInstalled,
} from "../../components/ETHConnect/ETHConnect";

const CreateCampaign = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const { ethereum } = window;
    const [userId, setUserId] = useState();
    const [showMetamaskConnect, setShowMetamaskConnect] = useState(false);
    const handleShowMetamaskConnect = () => {
        setShowMetamaskConnect(true);
    };

    const handleCloseMetamaskConnect = () => {
        setShowMetamaskConnect(false);
    };

    useEffect(async () => {
        const cookie = Cookies.get("jwt");
        if (cookie === undefined) navigate("/login");
        if (cookie !== undefined) setUserId(jsonwebtoken.decode(cookie).id);

        if (
            !isMetamaskInstalled() ||
            !window.ethereum.isConnected() ||
            !(ethereum.account !== undefined)
        )
            handleShowMetamaskConnect();

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

    return (
        <>
            <Navigationbar />
            <CampaignForm className="pb-5" campaignOrganiser={userId} />
            <ETHConnect
                show={showMetamaskConnect}
                handleClose={handleCloseMetamaskConnect}
            />
        </>
    );
};

export default CreateCampaign;
