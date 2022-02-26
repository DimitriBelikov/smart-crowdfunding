import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useMultipleFetch } from '../../controllers/useMultipleFetch';
const MyCampaigns = ({ createdCampaigns }) => {
    const { loading, data: campaigns } = useMultipleFetch(createdCampaigns.map(({ campaignId }) => `http://localhost:4545/api/campaign/${campaignId}`));
    console.log(campaigns);
    if (loading) {
        return <h1>Loading...</h1>
    }
    return <>

    </>
}

export default MyCampaigns;