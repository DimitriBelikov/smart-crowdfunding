import React from 'react';

const Footer = () => {
    return <>
        <div className='container-fluid fixed-bottom'>
            <div className='row'>
                <div className='col-md-4 border border-primary'>
                    <h1 className='text-center'>Explore</h1>
                </div>
                <div className='col-md-4 border border-primary'>
                    <h1 className='text-center'>About</h1>
                </div>
                <div className='col-md-4 border border-primary'>
                    <h1 className='text-center'>Legal</h1>
                </div>
            </div>
        </div>
    </>;
};

export default Footer;
