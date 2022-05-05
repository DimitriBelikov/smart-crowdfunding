import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import path from 'path';

//CSS
import "./UpdateCampaignForm.css";

const UpdateCampaignForm = ({ show, handleClose, campaignData }) => {
    const [existingCampaign, setExistingCampaign] = useState({
        campaignName: campaignData.campaignName,
        campaignDescription: campaignData.campaignDescription,
        campaignCoverMedia: campaignData.campaignCoverMedia,
        campaignResources: campaignData.campaignResources
    });
    const [newCampaign, setNewCampaign] = useState({ campaignResources: [], campaignCoverMedia: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });

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
        } else if (resourceType === 'NEW_CAMPAIGN_COVER_MEDIA') {
            setNewCampaign({ ...newCampaign, campaignCoverMedia: null });
        } else if (resourceType === 'EXISTING_CAMPAIGN_COVER_MEDIA') {
            setExistingCampaign({ ...existingCampaign, campaignCoverMedia: null });
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
                var fileSize = null;
                if (file.size / 1024 < 1000)
                    fileSize = (file.size / 1024).toFixed(1) + " KB";
                else
                    fileSize = ((file.size / 1024) / 1024).toFixed(1) + " MB";
                return {
                    fileObject: file,
                    filePath: path.join('campaignDocuments', campaignData._id, 'documents', file.name).replace(/\\/g, "/"),
                    fileSize: fileSize
                }
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
            //Null existing campaign cover media
        } else {
            setExistingCampaign({ ...existingCampaign, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('campaignId', campaignData._id);
        formData.append('campaignName', existingCampaign.campaignName);
        formData.append('campaignDescription', existingCampaign.campaignDescription);
        formData.append('campaignCategory', campaignData.campaignCategory);

        if (newCampaign.campaignCoverMedia !== null) formData.append('campaignCoverMedia', newCampaign.campaignCoverMedia);
        else if (existingCampaign.campaignCoverMedia !== null) formData.append('campaignCoverMediaPath', existingCampaign.campaignCoverMedia);

        for (let i = 0; i < newCampaign.campaignResources.length; i++)
            formData.append('campaignResources', newCampaign.campaignResources[i].fileObject);

        const existingCampaignResourcesPath = existingCampaign.campaignResources.map(({ filePath, fileSize }) => {
            return { filePath, fileSize }
        });
        const newCampaignResourcesPath = existingCampaignResourcesPath.concat(newCampaign.campaignResources.map(({ filePath, fileSize }) => {
            return { filePath, fileSize }
        }));

        for (let i = 0; i < newCampaignResourcesPath.length; i++) {
            for (let subKey in newCampaignResourcesPath[i]) {
                formData.append(`${subKey}`, newCampaignResourcesPath[i][subKey]);
                console.log(`${subKey}`, newCampaignResourcesPath[i][subKey])
            }
        }

        const requestOptions = {
            method: 'PUT',
            body: formData,
            withCredentials: true,
            credentials: "include"
        };
        const response = await fetch(`http://localhost:4545/api/campaign/${campaignData._id}`, requestOptions);
        if (response.status !== 200) {
            setExistingCampaign({
                campaignName: campaignData.campaignName,
                campaignDescription: campaignData.campaignDescription,
                campaignCoverMedia: campaignData.campaignCoverMedia,
                campaignResources: campaignData.campaignResources
            })
            setIsLoading(false);
        } else {
            window.location.reload(true);
        }
    }

    return <>
        <Modal className="modal" show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-center" centered>
            <Modal.Header>
                <Modal.Title className="font-weight-bold">
                    Update Campaign
                </Modal.Title>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <h1 className='text-center font-weight-bold'>{existingCampaign.campaignName}</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="campaign-name" className="custom-font">Campaign Name <span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="campaign-name" name='campaignName' placeholder="Type in Campaign Name" onChange={handleChange} required autoComplete="off" value={existingCampaign.campaignName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-description" className="custom-font">Campaign Description <span className='text-danger'>*</span></label>
                        <textarea className="form-control" id="campaign-description" rows="5" name='campaignDescription' placeholder="Type in Campaign Description" onChange={handleChange} required value={existingCampaign.campaignDescription} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaign-category" className="custom-font">Campaign Category <span className='text-danger'>*</span></label>
                        <select className="form-control form-field-bg-disabled" id="campaign-category" name='campaignCategory' required value={campaignData.campaignCategory} disabled>
                            <option>Education</option>
                            <option>Medical</option>
                            <option>Rights</option>
                            <option>Disaster Relief</option>
                            <option>Animal Care</option>
                            <option>Environment</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total-funding" className="custom-font">Total Funding Needed <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control form-field-bg-disabled" id="campaign-name" name='requiredFunding' placeholder="Enter Total Funding Needed" min={1} required value={campaignData.requiredFunding / Math.pow(10, 18)} disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="campaign-cover-image" className="custom-font">Campaign Cover Image</label><br />
                        <label className='file-btn' htmlFor="campaign-cover-image" style={{ "font-size": "17px" }}>Choose Files</label><br />
                        <input type="file" id="campaign-cover-image" name="campaignCoverMedia" onChange={handleChange} accept='image/*' style={{ "display": "none" }} />
                        <div className="container">
                            {existingCampaign.campaignCoverMedia !== null
                                && <div className="row m-1 p-1" >
                                    <div className="col-md-1">
                                        <a
                                            href={`http://localhost:4545/${existingCampaign.campaignCoverMedia}`}
                                            target="_blank"
                                            download
                                            rel="noreferrer"
                                        >
                                            <img
                                                className="pdf-icon"
                                                src="http://localhost:3000/file-icon.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="col-md-8 pl-0">
                                        <span>
                                            {existingCampaign.campaignCoverMedia.split('/').pop()}
                                        </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('EXISTING_CAMPAIGN_COVER_MEDIA')}><img
                                            src="http://localhost:3000/remove.png"
                                            className="pdf-icon m-0"
                                        /> </button>
                                    </div>
                                </div >
                            }
                            {newCampaign.campaignCoverMedia !== null
                                && <div className="row m-1 p-1" >
                                    <div className="col-md-1">
                                        <img
                                            className="pdf-icon"
                                            src="http://localhost:3000/file-icon.png"
                                            alt="File icon"
                                        />
                                    </div>
                                    <div className="col-md-8 pl-0">
                                        <span>
                                            {newCampaign.campaignCoverMedia.name}
                                        </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('NEW_CAMPAIGN_COVER_MEDIA')}> <img
                                            className="pdf-icon m-0"
                                            src="http://localhost:3000/remove.png"
                                        /> </button>
                                    </div>
                                </div>
                            }
                        </div >

                    </div >
                    <div className="form-group">
                        <label htmlFor="campaign-resources" className="custom-font">Campaign Resources</label> <br />
                        <label className='file-btn' htmlFor="campaign-resources" style={{ "font-size": "17px" }}>Choose Files</label><br />
                        <input type="file" id="campaign-resources" name="campaignResources" multiple onChange={handleChange} data-max-size='1024' style={{ "display": "none" }} />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                        <div className="container">
                            {existingCampaign.campaignResources.map((document, index) => (
                                <div className="row m-1 p-1" key={index} >
                                    <div className="col-md-1 pr-0">
                                        <a href={`http://localhost:4545/${document.filePath}`} target='_blank' rel="noreferrer" download>
                                            <img className='pdf-icon' src="http://localhost:3000/file-icon.png" alt="File icon" />
                                        </a>
                                    </div>
                                    <div className="col-md-8 pl-0">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('EXISTING_RESOURCE', index)}><img
                                            src="http://localhost:3000/remove.png"
                                            className="pdf-icon m-0"
                                        /> </button>
                                    </div>
                                    {index !==
                                        existingCampaign.campaignResources.length - 1 && (
                                            <hr
                                                width="100%"
                                                className="m-0 mb-1 mt-2"
                                            />
                                        )}
                                </div>
                            ))}
                            {newCampaign.campaignResources.map((document, index) => (
                                <div className="row m-1 p-1" key={index} >
                                    <div className="col-md-1 pr-0">
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" alt="File icon" />
                                    </div>
                                    <div className="col-md-8 pl-0">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('NEW_RESOURCE', index)}><img
                                            src="http://localhost:3000/remove.png"
                                            className="pdf-icon m-0"
                                        /> </button>
                                    </div>
                                    {index !==
                                        newCampaign.campaignResources.length - 1 && (
                                            <hr
                                                width="100%"
                                                className="m-0 mb-1 mt-2"
                                            />
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>

                </form >

            </Modal.Body >
            <Modal.Footer>
                {isLoading && <h6>Loading...</h6>}
                {isError.value ?
                    <Button variant="secondary" className='btn-custom font-weight-bold' onClick={(e) => handleSubmit} disabled>
                        Submit Request
                    </Button> :
                    <Button variant="primary" className="btn-custom font-weight-bold" onClick={handleSubmit}>
                        Update Campaign
                    </Button>
                }
            </Modal.Footer>
        </Modal >
    </>
}

export default UpdateCampaignForm