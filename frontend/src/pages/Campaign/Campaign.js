import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//Controllers
import { useFetch } from '../../controllers/useFetch';

//Components
import CampaignHeader from './CampaignHeader/CampaignHeader';
import CampaignDescriptionList from '../../components/CampaignDescriptionList/CampaignDescriptionList';
import CampaignDescription from './CampaignDescription/CampaignDescription';
import CampaignUpdates from './CampaignUpdates/CampaignUpdates';
import CampaignRequestHistory from './CampaignRequestHistory/CampaignRequestHistory';
import CampaignDocumentList from './CampaignDocumentList/CampaignDocumentList'


const Campaign = () => {
  const { id } = useParams();
  const { loading, data: campaignData } = useFetch(`http://localhost:4545/api/campaign/${id}`)

  const [descriptionList, setDescriptionList] = useState(['Campaign', 'Updates', 'Request History', 'Documents']);
  const [selectedTab, setSelectedTab] = useState('Campaign');
  const changeTab = (tabName) => {
    setSelectedTab(tabName);
  }

  if (loading) {
    return <>
      <h1>Loading....</h1>
    </>;
  }
  return <>
    <CampaignHeader campaignHeaderData={campaignData} />
    <CampaignDescriptionList itemsList={descriptionList} currentActive={selectedTab} clickFunction={changeTab} />
    {selectedTab === 'Campaign' && <CampaignDescription campaignDescription={campaignData.campaignDescription} />}
    {selectedTab === 'Updates' && <CampaignUpdates updates={[1, 2, 3]} />}
    {selectedTab === 'Request History' && <CampaignRequestHistory currentRequest={campaignData.campaignRequest} requestVotingHistory={campaignData.requestVotingHistory} />}
    {selectedTab === 'Documents' && <CampaignDocumentList documents={campaignData.campaignResources} />}
  </>;
};

export default Campaign;
