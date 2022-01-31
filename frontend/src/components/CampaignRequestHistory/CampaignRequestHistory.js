import React from 'react';

//Components
import CurrentRequestTile from '../RequestTile/CurrentRequestTile';
import HistoryRequestTile from '../RequestTile/HistoryRequestTile';

//CSS
import './CampaignRequestHistory.css';

const CampaignRequestHistory = ({ currentRequest, requestVotingHistory }) => {
    return <>
        <div className="container">
            <CurrentRequestTile request={currentRequest} />
            {[...requestVotingHistory].reverse().map((request, index) => (
                <HistoryRequestTile request={request} key={index} />
            ))}
        </div>
    </>;
};

export default CampaignRequestHistory;
