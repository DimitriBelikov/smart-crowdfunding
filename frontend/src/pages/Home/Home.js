import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//CSS
import './Home.css';

const Home = () => {
  return <>
    <div class="container-fluid">

      <div className="row">
        <div className="col">
          <h1 className="text-center">Home</h1>
        </div>
      </div>

      <div class="row">
        <div className="col-md-5 border border-primary">
          <h1 className='text-center'>Catchy Lines</h1>
        </div>
        <div className="col-md-7 border border-primary">
          <h1 className='text-center'>Carousel</h1>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col border border-primary">
          <h1 className='text-center'>Featured Campaigns</h1>
        </div>
      </div>

    </div>
  </>;
};

export default Home;
