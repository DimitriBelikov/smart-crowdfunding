import React, { useState, useEffect } from 'react';

//Components
import Pagination from '../../components/Pagination/Pagination';
import CampaignCard from './CampaignCard/CampaignCard';
import CampaignDescriptionList from '../../components/CampaignDescriptionList/CampaignDescriptionList';
import Navigationbar from '../../components/Navigationbar/Navigationbar';

//Controllers
import { useFetch } from '../../controllers/useFetch';

const Campaigns = () => {
  const { loading, data: campaigns } = useFetch("http://localhost:4545/api/campaign");
  // console.log("Campaigns: " + campaigns);
  // console.log(loading);

  const [category, setCategory] = useState("All");
  const showPerPage = 6;
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const [total, setTotal] = useState(0);
  const categoryList = ['All', 'Education', 'Medical', 'Human Rights', 'Disaster Relief', 'Animal Care', 'Environment'];


  useEffect(() => {
    // console.log("Inside UseEffect");
    // console.log("Campaigns Length: " + campaigns.length);
    setTotal(campaigns.length);
  }, [loading])

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const filterCampaigns = (category) => {
    setCategory(category);
    setTotal((category === 'All' ? campaigns : campaigns.filter(campaign => campaign.campaignCategory === category)).length)
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  return <>
    <Navigationbar />
    <div className="container-fluid">
      <div className="row">
        <div className="col border border-primary">
          <h1 className='text-center'>Campaigns</h1>
        </div>
      </div>

      <CampaignDescriptionList itemsList={categoryList} currentActive={category} clickFunction={filterCampaigns} />

      <div id='campaigns' className="row">
        {(category === 'All' ? campaigns : campaigns.filter(campaign => campaign.campaignCategory === category)).slice(pagination.start, pagination.end).map((filteredCampaign) => (
          <div className="col-md-4 mt-4 border border-primary d-flex justify-content-center" key={filteredCampaign._id}>
            <CampaignCard campaign={filteredCampaign} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col text-center border border-primary mt-3 pt-3">
          {/* {console.log("Before Pagination - total: " + total)} */}
          {(total > 0) && <Pagination
            showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            total={total}
          />}
        </div>
      </div>
    </div>
  </>;
};

export default Campaigns;
