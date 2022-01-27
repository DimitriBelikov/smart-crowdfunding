import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Components
import Pagination from '../../components/Pagination/Pagination';
import CampaignCard from '../../components/CampaignCard/CampaignCard';

//Controllers
import { useFetch } from '../../controllers/useFetch';

const Campaigns = () => {
  const { loading, data: campaigns } = useFetch("http://localhost:4545/api/campaign");
  console.log(campaigns);
  console.log(loading);

  const [category, setCategory] = useState("all");
  const [showPerPage, setShowPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const filterCampaigns = (category) => {
    setCategory(category);
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  return <>
    <div className="container-fluid">
      <div className="row">
        <div className="col border border-primary">
          <h1 className='text-center'>Campaigns</h1>
        </div>
      </div>

      <div className="row">
        <div className="col border border-primary">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" onClick={() => filterCampaigns("all")}>All</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => filterCampaigns("Education")}>Education</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => filterCampaigns("Medical")}>Medical</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => filterCampaigns("Human Rights")}>Human Rights</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={() => filterCampaigns("Disaster Relief")}>Disaster Relief</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={() => filterCampaigns("Animal Care")}>Animal Care</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={() => filterCampaigns("Environment")}>Environment</a>
            </li>
          </ul>
        </div>
      </div>

      <div id='campaigns' className="row">
        {(category === 'all' ? campaigns : campaigns.filter(campaign => campaign.campaignCategory === category)).slice(pagination.start, pagination.end).map((filteredCampaign) => (
          <div className="col-md-4 mt-4 border border-primary d-flex justify-content-center" key={filteredCampaign._id}>
            <CampaignCard campaign={filteredCampaign} />
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
