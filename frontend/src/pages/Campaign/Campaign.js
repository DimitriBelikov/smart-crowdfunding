import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../controllers/useFetch';
import CampaignTitleCard from '../../components/CampaignTitleCard/CampaignTitleCard';


const Campaign = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, data: campaignData } = useFetch(`http://localhost:4545/api/campaign/${id}`)
  console.log(campaignData);

  if (loading) {
    return <>
      <h1>Loading....</h1>
    </>;
  }
  return <>
    <h1>Campaign</h1>
    <CampaignTitleCard />
  </>;
};

export default Campaign;
