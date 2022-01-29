import React from 'react';

const CampaignRequestHistory = ({ requestHistory }) => {
    return <>
        <div className="container">
            {requestHistory.map((request, index) => (
                <div className="row m-3">
                    <div className="col-md-1 d-flex align-items-center text-center border border-success">
                        <h4 className='p-4'>1</h4>
                    </div>
                    <div className="col-md-9 border border-success">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Request Title</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Request Documents.</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Inserting PDFs here</h3>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 border border-success">
                        <div className="row  mb-3 mt-3 border border-warning">
                            <div className="col-sm-12 text-center">
                                <h6>Request Status</h6>
                            </div>
                            <div className="col-sm-12 text-center">
                                <h6>Active</h6>
                            </div>
                        </div>
                        <div className="row mb-3 mt-3 border border-warning">
                            <div className="col-sm-12 text-center">
                                <h6>Request Amount</h6>
                            </div>
                            <div className="col-sm-12 text-center">
                                <h6>10 ETH</h6>
                            </div>
                        </div>
                        <div className="row mb-3 mt-3 border border-warning">
                            <div className="col-sm-12 text-center">
                                <h6>upVote Percentage</h6>
                            </div>
                            <div className="col-sm-12 text-center">
                                <h6>20%</h6>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default CampaignRequestHistory;
