import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import path from 'path';

//CSS
import './UpdateRequestForm.css';

const UpdateRequestForm = ({ show, handleClose, requestData, campaignId }) => {
    const [existingRequest, setExistingRequest] = useState({
        requestTitle: requestData.requestTitle,
        requestDescription: requestData.requestDescription,
        requestResources: requestData.requestResources,
        deadline: requestData.deadline === undefined ? null : requestData.deadline.split('.')[0]
    });
    const [newRequestResources, setNewRequestResources] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });

    const removeDocument = (resourceType, index) => {
        if (resourceType === 'EXISTING_RESOURCE') {
            setExistingRequest((prevRequest) => {
                return {
                    ...prevRequest, requestResources: prevRequest.requestResources.filter((resource, filteringIndex) => {
                        return index !== filteringIndex;
                    })
                }
            });
        } else if (resourceType === 'NEW_RESOURCE') {
            setNewRequestResources((prevRequestResources) => {
                return prevRequestResources.filter((resource, filteringIndex) => {
                    return index !== filteringIndex;
                })
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'requestResources') {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length + existingRequest.requestResources.length > 5) {
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
            var updatedRequestResources = filesArray.map(file => {
                var fileSize = null;
                if (file.size / 1024 < 1000)
                    fileSize = (file.size / 1024).toFixed(1) + " KB";
                else
                    fileSize = ((file.size / 1024) / 1024).toFixed(1) + " MB";
                return {
                    fileObject: file,
                    filePath: path.join('campaignDocuments', campaignId, 'request', requestData.requestNumber.toString(), file.name).replace(/\\/g, "/"),
                    fileSize: fileSize
                }
            });
            console.log(updatedRequestResources);
            setNewRequestResources(updatedRequestResources);
        } else {
            setExistingRequest({ ...existingRequest, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const formData = new FormData();

        formData.append('campaignId', campaignId);
        formData.append('requestNumber', requestData.requestNumber);
        formData.append('requestTitle', existingRequest.requestTitle);
        formData.append('requestDescription', existingRequest.requestDescription);
        formData.append('deadline', existingRequest.deadline);

        for (let i = 0; i < newRequestResources.length; i++)
            formData.append('requestResources', newRequestResources[i].fileObject);

        const existingRequestResourcesPath = existingRequest.requestResources.map(({ filePath, fileSize }) => {
            return { filePath, fileSize }
        });
        const newRequestResourcesPath = existingRequestResourcesPath.concat(newRequestResources.map(({ filePath, fileSize }) => {
            return { filePath, fileSize }
        }));

        for (let i = 0; i < newRequestResourcesPath.length; i++) {
            for (let subKey in newRequestResourcesPath[i]) {
                formData.append(`${subKey}`, newRequestResourcesPath[i][subKey]);
                console.log(`${subKey}`, newRequestResourcesPath[i][subKey])
            }
        }

        const requestOptions = {
            method: 'PUT',
            body: formData,
            withCredentials: true,
            credentials: "include"
        };

        const response = await fetch(`http://localhost:4545/api/campaign/${campaignId}/request/current`, requestOptions);

        if (response.status !== 200) {
            setExistingRequest({
                requestTitle: requestData.requestTitle,
                requestDescription: requestData.requestDescription,
                requestResources: requestData.requestResources,
                requestDeadline: requestData.deadline
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
                    Update Request {requestData.requestNumber}
                </Modal.Title>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <h1 className='text-center font-weight-bold'>{existingRequest.requestTitle}</h1>
                <form>
                    <div className="form-group">
                        <label className="update-request-form-field-titles" htmlFor="request-title">Request Title <span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="request-title" name='requestTitle' placeholder="Type in Request Title" onChange={handleChange} required autoComplete="off" value={existingRequest.requestTitle} />
                    </div>
                    <div className="form-group">
                        <label className="update-request-form-field-titles" htmlFor="request-description">Request Description <span className='text-danger'>*</span></label>
                        <textarea className="form-control" id="request-description" rows="5" name='requestDescription' placeholder="Type in Request Description" onChange={handleChange} required value={existingRequest.requestDescription} />
                    </div>
                    <div className="form-group">
                        <label className="update-request-form-field-titles" htmlFor="request-amount">Total Request Amount Needed <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control form-field-bg-disabled" id="request-amount" name='requestAmount' placeholder="Enter Total Request Amount Needed" min={1} required value={requestData.requestAmount / Math.pow(10, 18)} disabled />
                    </div>
                    <div className="form-group">
                        <label className="update-request-form-field-titles">Request Deadline</label>
                        <input type="datetime-local" name='deadline' className="form-control date-time-form-field" onChange={handleChange} value={existingRequest.deadline} min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('.')[0]} max={new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString().split('.')[0]} />
                    </div>
                    <div className="form-group">
                        <label className="update-request-form-field-titles" htmlFor="request-resources">Request Resources</label> <br />
                        <label className='file-btn' htmlFor="request-resources" style={{ "font-size": "17px" }}>Choose Files</label><br />
                        <input type='file' id="request-resources" name="requestResources" multiple onChange={handleChange} data-max-size='1024' style={{ "display": "none" }} />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                        <div className="container">
                            {existingRequest.requestResources.map((document, index) => (
                                <div className="row m-1 p-1" key={index} >
                                    <div className="col-md-1">
                                        <a href={`http://localhost:4545/${document.filePath}`} target='_blank' rel="noreferrer" download>
                                            <img className='pdf-icon' src="http://localhost:3000/file-icon.png" alt="File icon" />
                                        </a>
                                    </div>
                                    <div className="col-md-8">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('EXISTING_RESOURCE', index)}><img
                                            src="http://localhost:3000/remove.png"
                                            className="pdf-icon m-0"
                                        /></button>
                                    </div>
                                    {index !==
                                        existingRequest.requestResources.length - 1 && (
                                            <hr
                                                width="100%"
                                                className="m-0 mb-1 mt-2"
                                            />
                                        )}
                                </div>
                            ))}
                            {newRequestResources.map((document, index) => (
                                <div className="row m-1 p-1" key={index} >
                                    <div className="col-md-1">
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" alt="File icon" />
                                    </div>
                                    <div className="col-md-8">
                                        <span>{document.filePath.split('/').pop()} </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className='btn p-0' type='button' onClick={() => removeDocument('NEW_RESOURCE', index)}><img
                                            src="http://localhost:3000/remove.png"
                                            className="pdf-icon m-0"
                                        /></button>
                                    </div>
                                    {index !==
                                        newRequestResources.length - 1 && (
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
                    <Button variant="secondary" className="btn btn-custom font-weight-bold border-none" onClick={(e) => handleSubmit} disabled>
                        Submit Request
                    </Button> :
                    <Button className="btn btn-custom font-weight-bold border-none" onClick={handleSubmit}>
                        Update Request
                    </Button>
                }
            </Modal.Footer>
        </Modal >
    </>
}

export default UpdateRequestForm