import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//Controllers
import { useFetch } from '../../controllers/useFetch';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';
import CampaignHeader from './CampaignHeader/CampaignHeader';
import CampaignDescriptionList from '../../components/CampaignDescriptionList/CampaignDescriptionList';
import CampaignDescription from './CampaignDescription/CampaignDescription';
import CampaignUpdates from './CampaignUpdates/CampaignUpdates';
import CampaignRequestHistory from './CampaignRequestHistory/CampaignRequestHistory';
import CampaignDocumentList from './CampaignDocumentList/CampaignDocumentList'

//AntD Components
import { Spin } from 'antd';


const Campaign = () => {
    window.scrollTo(0, 0);
    const { id } = useParams();
    const { loading, data: campaignData } = useFetch(`http://localhost:4545/api/campaign/${id}`)

    const descriptionList = ['Campaign', 'Updates', 'Request History', 'Documents'];
    const [selectedTab, setSelectedTab] = useState('Campaign');
    const changeTab = (tabName) => {
        setSelectedTab(tabName);
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size='large' />
            </div>
        )
    }

    return <>
        <Navigationbar />
        <CampaignHeader campaignHeaderData={campaignData} />
        <CampaignDescriptionList itemsList={descriptionList} currentActive={selectedTab} clickFunction={changeTab} />
        {selectedTab === 'Campaign' && <CampaignDescription campaignDescription={campaignData.campaignDescription} />}
        {selectedTab === 'Updates' && <CampaignUpdates updates={campaignData.updates} />}
        {selectedTab === 'Request History' && <CampaignRequestHistory currentRequest={campaignData.campaignRequest} requestVotingHistory={campaignData.requestVotingHistory} votersList={campaignData.currentVote} donors={campaignData.donors} campaignId={campaignData._id} />}
        {selectedTab === 'Documents' && <CampaignDocumentList documents={campaignData.campaignResources} />}
    </>;
};

export default Campaign;
