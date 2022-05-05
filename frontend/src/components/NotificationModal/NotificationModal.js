import React from "react";
import { Modal, Button } from 'react-bootstrap';

const NotificationModal = ({ show, handleClose, notificationMessage, notificationHeader }) => {
    return <>
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            backdrop="static"
            keyboard={false}
            className="modal"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className='font-weight-bold'>
                    {notificationHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>
                    {notificationMessage}
                </h6>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-custom font-weight-bold" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
};

export default NotificationModal;
