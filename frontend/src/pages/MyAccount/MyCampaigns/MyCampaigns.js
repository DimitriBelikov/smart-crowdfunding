import React, { useEffect } from "react";
import { useMultipleFetch } from '../../../controllers/useMultipleFetch';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

//AntD Components
import { Spin } from 'antd';

const MyCampaigns = ({ createdCampaigns }) => {
    const { loading, data: campaigns } = useMultipleFetch(createdCampaigns.map(({ campaignId }) => `http://localhost:4545/api/campaign/${campaignId}`));
    const navigate = useNavigate();
    const cookie = Cookies.get("jwt");
    useEffect(() => {
        if (cookie === undefined) navigate("/login");
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size='large' />
            </div>
        )
    }
    return <>
        <div className="col">
            {campaigns.length === 0 && <h6 className="text-center mt-5">Your Campaigns Appear Here</h6>}
            {campaigns.map((item, key) => (
                <div className="row mb-4" key={key}>
                    <Card campaign={item} />
                </div>

            ))}
        </div>

    </>
}

export default MyCampaigns;