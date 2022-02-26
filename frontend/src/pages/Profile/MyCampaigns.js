import React, { useCallback } from 'react';
import { useState , useEffect} from 'react';
import { useMultipleFetch } from '../../controllers/useMultipleFetch';
const MyCampaigns = ({createdCampaigns}) => {

    var tempArray = [];

    const [data, setData] = useState([]);

    const { loading, data: campaigns } = useMultipleFetch(createdCampaigns.map(({campaignId})=>`http://localhost:4545/api/campaign/${campaignId}`));

    console.log(campaigns)
    // console.log(loading)

    return <>
    </>
}

export default MyCampaigns;