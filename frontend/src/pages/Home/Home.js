import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';

//CSS
import './Home.css';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const showMoreCampaigns = () => {
    navigate('/campaigns');
  }

  useEffect(() => {
    const cookie = Cookies.get('jwt');
    const data = jsonwebtoken.decode(cookie);
  }, []);

  return <>
    <Navigationbar />
    <div class="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Home</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5 border border-primary">
          <h1 className='text-center'>Catchy Lines</h1>
        </div>
        <div className="col-md-7 border border-primary">
          <h1 className='text-center'>Carousel</h1>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col border border-primary text-center">
          <h1>Featured Campaigns</h1>
          <button type="button" className="btn btn-primary" onClick={showMoreCampaigns}>Show More Campaigns &#8594;</button>
        </div>
      </div>

    </div>
  </>;
};

export default Home;
