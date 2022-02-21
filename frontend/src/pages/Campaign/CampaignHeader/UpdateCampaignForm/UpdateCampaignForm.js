import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';

const UpdateCampaignForm = ({ show, handleClose, campaignData }) => {
    const [existingCampaign, setExistingCampaign] = useState({
        campaignName: campaignData.campaignName,
        campaignDescription: campaignData.campaignDescription,
        campaignCoverMedia: campaignData.campaignCoverMedia
    })
    const [campaignResources, setCampaignResources] = useState(campaignData.campaignResources);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: true, msg: '' });
    const [updatedFiles, setUpdatedFiles] = useState({ campaignCoverMedia: [], campaignResources: [] })

    console.log(campaignResources);

    const removeDocument = (index) => {
        // let tempResources = campaignResources.filter((campaignResource, tempIndex) => index !== tempIndex);
        setCampaignResources((prevResources) => {
            return prevResources.filter((resource, filteringIndex) => {
                return index !== filteringIndex;
            })
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'campaignResources' || name === 'campaignCoverMedia') {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length > 10) {
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
            setUpdatedFiles(filesArray);
        }
        else {
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-resources">Campaign Resources</label> <br />
                        <input type="file" id="campaign-resources" name="campaignResources" multiple onChange={handleChange} data-max-size='1024' />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                    </div>
                    <div className="container">
                        {campaignResources.map((document, index) => (
                            < div className="row border border-secondary m-1 p-1" key={index} >
                                <div className="col-md-1">
                                    <a href={`http://localhost:4545/${document.filePath}`} target='_blank' download>
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                    </a>
                                </div>
                                <div className="col-md-8">
                                    <span>{index} {document.filePath.split('/').pop()} </span>
                                </div>
                                <div className="col-md-3 text-right">
                                    <button className='btn' onClick={() => removeDocument(index)}><span>&#10060;</span></button>
                                </div>
                            </div>
                        ))}
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