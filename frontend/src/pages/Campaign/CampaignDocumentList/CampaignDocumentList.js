import React from 'react';
import { Link } from 'react-router-dom';
import { download } from 'downloadjs';

const CampaignDocumentList = ({ documents }) => {
    return <>
        <div className="container border border-primary">
            <div className="row border-bottom border-secondary m-3">
                <div className="col">
                    <h4>Campaign Documents</h4>
                </div>
            </div>

            <div className="row border-bottom border-secondary m-3">
                <div className="col">
                    <h6 className='d-flex inline-block float-left'>{documents.length} File(s) </h6>
                    <h6 className='text-right d-flex inline-block float-right'>Last Updated: 16 Oct 2021</h6>
                </div>
            </div>

            {documents.map((document, index) => (
                <div className="row border border-secondary m-3 p-3" key={index}>
                    <div className="col-md-1">
                        <a href={`http://localhost:4545/${document.filePath}`} target='_blank' download><span className='font-weight-bold'>&#8595;</span></a>
                    </div>
                    <div className="col-md-9">
                        <h6>{document.filePath.split('/').pop()}</h6>
                    </div>
                    <div className="col-md-2">
                        <h6>Size: {document.fileSize}</h6>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default CampaignDocumentList;
