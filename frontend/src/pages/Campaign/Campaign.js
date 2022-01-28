import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../controllers/useFetch';
import CampaignHeader from '../../components/CampaignHeader/CampaignHeader';
import CampaignDescriptionList from '../../components/CampaignDescriptionList/CampaignDescriptionList';


const Campaign = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, data: campaignData } = useFetch(`http://localhost:4545/api/campaign/${id}`)
  console.log(campaignData);

  const [descriptionList, setDescriptionList] = useState(['Campaigns', 'Updates', 'Request History', 'Documents']);
  const TestFunction = () => {
    console.log('Clicked');
  }

  if (loading) {
    return <>
      <h1>Loading....</h1>
    </>;
  }
  return <>
    <CampaignHeader coverImage={campaignData.campaignCoverMedia}/>
    <CampaignDescriptionList itemsList={descriptionList} currentActive={descriptionList[0]} clickFunction={TestFunction} />
  </>;
};

export default Campaign;
