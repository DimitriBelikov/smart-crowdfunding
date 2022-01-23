import React, { useState } from 'react';

//Components
import Pagination from '../../components/Pagination/Pagination';
import CampaignCard from '../../components/CampaignCard/CampaignCard';

//Data
import { data } from './testdata';

const Campaigns = () => {
  const [posts, setPosts] = useState(data);
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
        {posts.slice(pagination.start, pagination.end).map((post) => (
          <div className="col-md-4 mt-4 border border-primary d-flex justify-content-center" key={post.id}>
            <CampaignCard title={post.title} body={post.body} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col text-center border border-primary mt-3">
          <Pagination
            showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            total={posts.length}
          />
        </div>
      </div>
    </div>
  </>;
};

export default Campaigns;
