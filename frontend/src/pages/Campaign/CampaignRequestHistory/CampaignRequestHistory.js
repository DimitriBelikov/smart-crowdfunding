import React from 'react';

//Components
import CurrentRequestTile from './RequestTile/CurrentRequestTile';
import HistoryRequestTile from './RequestTile/HistoryRequestTile';

//CSS
import './CampaignRequestHistory.css';

const CampaignRequestHistory = ({ currentRequest, requestVotingHistory }) => {
    return <>
        <div className="container">
            {(requestVotingHistory.length === 0 && currentRequest.requestTitle == null) &&
                <div className="row m-3 ">
                    <div className="col">
                        <p className='text-secondary text-center m-0'>No Requests Created yet.</p>
                    </div>
                </div>
            }
            {currentRequest.requestTitle != null && <CurrentRequestTile request={currentRequest} />}
            {[...requestVotingHistory].reverse().map((request, index) => (
                <HistoryRequestTile request={request} key={index} />
            ))}
        </div>
    </>;
};

export default CampaignRequestHistory;
