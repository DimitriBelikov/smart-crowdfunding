import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RequestForm = ({ show, handleClose, requestNumber, campaignId, amountCollected, amountDisbursed}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: true, msg: '' });
    const [request, setRequest] = useState({
        requestNumber: requestNumber,
        requestTitle: '',
        requestDescription: '',
        requestAmount: 0,
        requestResources: [],
        deadline: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'requestResources') {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length > 5) {
                setIsError({ value: true, msg: 'You can upload maximum 5 files' });
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
            setRequest({ ...request, [name]: Array.from(e.target.files) });
        }
        else {
            setRequest({ ...request, [name]: value });
        }
    }

    const isRequestDataValid = () => {
        if (request.requestTitle === '' || request.requestDescription === '' || request.requestAmount === 0 || request.deadline === null){
            setIsError({ value: true, msg: 'Please Fill All the Required Fields'});
            return false;
        }
        if (request.requestAmount*Math.pow(10,18) > amountCollected-amountDisbursed){
            setIsError({ value: true, msg: 'Insufficient Money in Smart Contract. Funds Remaining = '+ String((amountCollected-amountDisbursed)/Math.pow(10,18))+ ' ETH'});
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRequestDataValid()){
            setIsLoading(true);
            console.log(request);
            const formData = new FormData();
            formData.append('requestNumber', request.requestNumber);
            for (var i = 0; i < request.requestResources.length; i++)
                formData.append('requestResources', request.requestResources[i]);
            formData.append('requestTitle', request.requestTitle);
            formData.append('requestDescription', request.requestDescription);
            formData.append('requestAmount', request.requestAmount);
            formData.append('deadline', request.deadline);

            const requestOptions = {
                method: 'POST',
                body: formData
            };

            const response = await fetch(`http://localhost:4545/api/campaign/${campaignId}/request`, requestOptions);
            const result = await response.json();
            setRequest({
                requestNumber: requestNumber,
                requestTitle: '',
                requestDescription: '',
                requestAmount: 0,
                requestResources: [],
                deadline: null
            });
            setIsLoading(false);
            if (response.status !== 200) {
                setIsError({ value: true, msg: result.msg });
            } else {
                handleClose();
                window.location.reload(true);
            }
        }
    }

    return <>
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-center" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Request Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className='text-center'>Request Number {request.requestNumber}</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="request-title">Request Title <span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" id="request-title" name='requestTitle' placeholder="Type in Request Title" value={request.requestTitle} onChange={handleChange} required autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-description">Request Description <span className='text-danger'>*</span></label>
                        <textarea className="form-control" id="request-description" rows="5" name='requestDescription' placeholder="Type in Request Description" value={request.requestDescription} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-amount">Request Amount <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control" id="request-amount" name='requestAmount' placeholder="Enter Request Amount Needed" min={String(0)} max={String(amountCollected)} value={request.requestAmount === 0 ? null : request.requestAmount} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-deadline">Deadline <span className='text-danger'>*</span></label> <br />
                        <input type="datetime-local" name="deadline" id='request-deadline' value={request.deadline} onChange={handleChange} required min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('.')[0]} max={new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString().split('.')[0]} />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-resources">Request Resources</label> <br />
                        <input type="file" id="request-resources" name="requestResources" multiple onChange={handleChange} data-max-size='1024' />
                        {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {isLoading && <h6>Loading...</h6>}
                <Button variant="primary" onClick={handleSubmit}>
                        Submit Request
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default RequestForm;