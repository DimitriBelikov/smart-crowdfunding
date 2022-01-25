import React from 'react';

const Footer = () => {
    return <footer className='page-footer'>
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-md-3 border border-primary'>
                    <h1 className='text-center'>Get Started</h1>
                    <p className='ml-5'>
                        Dashboard <br />
                        Create Your Campaign <br />
                        Donate <br />
                        User Guide <br />
                    </p>
                </div>
                <div className='col-md-3 border border-primary'>
                    <h1 className='text-center'>About</h1>
                    <p className='ml-5'>
                        Contact Us <br />
                        Get to Know us <br />
                        White Paper <br />
                    </p>
                </div>
                <div className='col-md-3 border border-primary'>
                    <h1 className='text-center'>Explore</h1>
                    <p className='ml-5'>
                        Category 1 <br />
                        Category 2 <br />
                        Category 3 <br />
                    </p>
                </div>
                <div className='col-md-3 border border-primary'>
                    <h1 className='text-center'>Legal</h1>
                    <p className='ml-5'>
                        Terms &#38; Conditions <br />
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    All Rights Reserved by SMARTFUNDCUBE Team
                </div>
            </div>
        </div>
    </footer>;
};

export default Footer;
