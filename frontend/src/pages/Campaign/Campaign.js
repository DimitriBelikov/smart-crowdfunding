import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//Controllers
import { useFetch } from '../../controllers/useFetch';

//Components
import CampaignHeader from '../../components/CampaignHeader/CampaignHeader';
import CampaignDescriptionList from '../../components/CampaignDescriptionList/CampaignDescriptionList';
import CampaignDescription from '../../components/CampaignDescription/CampaignDescription';
import CampaignUpdates from '../../components/CampaignUpdates/CampaignUpdates';
import CampaignRequestHistory from '../../components/CampaignRequestHistory/CampaignRequestHistory';
import CampaignDocumentList from '../../components/CampaignDocumentList/CampaignDocumentList'


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
    {selectedTab === 'Documents' && <CampaignDocumentList documents={[1, 2, 3, 4]} />}
  </>;
};

export default Campaign;
