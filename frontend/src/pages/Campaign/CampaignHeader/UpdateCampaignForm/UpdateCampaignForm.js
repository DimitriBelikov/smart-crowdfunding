import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import path from 'path';

const UpdateCampaignForm = ({ show, handleClose, campaignData }) => {
    const [existingCampaign, setExistingCampaign] = useState({
        campaignName: campaignData.campaignName,
        campaignDescription: campaignData.campaignDescription,
        campaignCoverMedia: campaignData.campaignCoverMedia,
        campaignResources: campaignData.campaignResources
    });
    const [newCampaign, setNewCampaign] = useState({ campaignResources: [], campaignCoverMedia: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: true, msg: '' });

    const removeDocument = (resourceType, index) => {
        if (resourceType === 'EXISTING_RESOURCE') {
            setExistingCampaign((prevCampaign) => {
                return {
                    ...prevCampaign, campaignResources: prevCampaign.campaignResources.filter((resource, filteringIndex) => {
                        return index !== filteringIndex;
                    })
                }
            });
        } else if (resourceType === 'NEW_RESOURCE') {
            setNewCampaign((prevCampaign) => {
                return {
                    ...prevCampaign, campaignResources: prevCampaign.campaignResources.filter((resource, filteringIndex) => {
                        return index !== filteringIndex;
                    })
                }
            });
        } else if (resourceType === 'CAMPAIGN_COVER_MEDIA') {
            setNewCampaign({ ...newCampaign, campaignCoverMedia: null });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'campaignResources') {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length + existingCampaign.campaignResources.length > 10) {
                setIsError({ value: true, msg: 'You can upload maximum 10 files' });
                return;
            } else {
                for (var i = 0; i < filesArray.length; i++) {
                    if (filesArray[i].size > 10500000) {
                        setIsError({ value: true, msg: 'One of your files have exceded the limit of 10MB' });
                        return;
                    }
                }
            }
            setIsError({ value: false, msg: '' });
            var updatedCampaignResources = filesArray.map(file => {
                if (file.size / 1024 < 1000)
                    var fileSize = (file.size / 1024).toFixed(1) + " KB";
                else
                    var fileSize = ((file.size / 1024) / 1024).toFixed(1) + " MB";
                return { fileObject: file, filePath: path.join(campaignData._id, 'documents', file.name).replace(/\\/g, "/"), fileSize: fileSize }
            });
            setNewCampaign({ ...newCampaign, campaignResources: updatedCampaignResources });
        } else if (name === 'campaignCoverMedia') {
            const filesArray = Array.from(e.target.files);
            if (filesArray[0].size > 10500000) {
                setIsError({ value: true, msg: 'Your file have exceded the limit of 10MB' });
                return;
            }
            setIsError({ value: false, msg: '' });
            setNewCampaign({ ...newCampaign, campaignCoverMedia: filesArray[0] });
        } else {
            setExistingCampaign({ ...existingCampaign, [name]: value });
        }
    }

    const handleSubmit = () => {

    }
    return <>
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-center" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Update Campaign
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className='text-center'>Campaign Title</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="campaign-name">Campaign Name <span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="campaign-name" name='campaignName' placeholder="Type in Campaign Name" onChange={handleChange} required autoComplete="off" value={existingCampaign.campaignName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-description">Campaign Description <span className='text-danger'>*</span></label>
                        <textarea className="form-control" id="campaign-description" rows="5" name='campaignDescription' placeholder="Type in Campaign Description" onChange={handleChange} required value={existingCampaign.campaignDescription} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-category">Campaign Category <span className='text-danger'>*</span></label>
                        <select className="form-control" id="campaign-category" name='campaignCategory' required value={campaignData.campaignCategory} disabled>
                            <option>Education</option>
                            <option>Medical</option>
                            <option>Rights</option>
                            <option>Disaster Relief</option>
                            <option>Animal Care</option>
                            <option>Environment</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total-funding">Total Funding Needed <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control" id="campaign-name" name='requiredFunding' placeholder="Enter Total Funding Needed" min={1} required value={campaignData.requiredFunding / Math.pow(10, 18)} disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="campaign-cover-image">Campaign Cover Image</label><br />
                        <input type="file" id="campaign-cover-image" name="campaignCoverMedia" onChange={handleChange} accept='image/*' />
                        <div className="container">
                            {newCampaign.campaignCoverMedia === null
                                ? <div className="row border border-success m-1 p-1" >
                                    <div className="col-md-1">
                                        <a href={`http://localhost:4545/${existingCampaign.campaignCoverMedia}`} target='_blank' download>
                                            <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                        </a>
                                    </div>
                                    <div className="col-md-8">
                                        <span>{existingCampaign.campaignCoverMedia.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                    </div>
                                </div>
                                : <div className="row border border-success m-1 p-1" >
                                    <div className="col-md-1">
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                    </div>
                                    <div className="col-md-8">
                                        <span>{newCampaign.campaignCoverMedia.name} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn' type='button' onClick={() => removeDocument('CAMPAIGN_COVER_MEDIA')}><span>&#10060;</span></button>
                                    </div>
                                </div>}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-resources">Campaign Resources</label> <br />
                        <input type="file" id="campaign-resources" name="campaignResources" multiple onChange={handleChange} data-max-size='1024' />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                        <div className="container">
                            {existingCampaign.campaignResources.map((document, index) => (
                                <div className="row border border-success m-1 p-1" key={index} >
                                    <div className="col-md-1">
                                        <a href={`http://localhost:4545/${document.filePath}`} target='_blank' download>
                                            <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                        </a>
                                    </div>
                                    <div className="col-md-8">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn' type='button' onClick={() => removeDocument('EXISTING_RESOURCE', index)}><span>&#10060;</span></button>
                                    </div>
                                </div>
                            ))}
                            {newCampaign.campaignResources.map((document, index) => (
                                <div className="row border border-primary m-1 p-1" key={index} >
                                    <div className="col-md-1">
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                    </div>
                                    <div className="col-md-8">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn' type='button' onClick={() => removeDocument('NEW_RESOURCE', index)}><span>&#10060;</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </form>

            </Modal.Body>
            <Modal.Footer>
                {isLoading && <h6>Loading...</h6>}
                {isError.value ?
                    <Button variant="secondary" onClick={handleSubmit} disabled>
                        Submit Request
                    </Button> :
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit Request
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    </>
}

export default UpdateCampaignForm