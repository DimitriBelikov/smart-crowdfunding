import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Components
import Pagination from '../../components/Pagination/Pagination';
import CampaignCard from '../../components/CampaignCard/CampaignCard';

//Controllers
import { useFetch } from '../../controllers/useFetch';

//Data
//import { data } from './testdata';

const Campaigns = () => {
  const { loading, data: campaigns } = useFetch("http://localhost:4545/api/campaign");
  console.log(campaigns);

  const [showPerPage, setShowPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  return <>
    <div className="container-fluid">
      <div className="row">
        <div className="col border border-primary">
          <h1 className='text-center'>Campaigns</h1>
        </div>
      </div>

      <div className="row">
        <div className="col border border-primary">
          <h3 className='text-center'>Categories Menu</h3>
        </div>
      </div>

      <div id='campaigns' className="row">
        {campaigns.slice(pagination.start, pagination.end).map((campaign) => (
          <div className="col-md-4 mt-4 border border-primary d-flex justify-content-center" key={campaign.id}>
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col text-center border border-primary mt-3 pt-3">
          <Pagination
            showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            total={campaigns.length}
          />
        </div>
      </div>
    </div>
  </>;
};

export default Campaigns;
