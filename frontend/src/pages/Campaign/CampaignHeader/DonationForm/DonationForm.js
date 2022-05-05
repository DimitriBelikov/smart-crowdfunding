import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Web3 from 'web3';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

//Components
import NotificationModal from '../../../../components/NotificationModal/NotificationModal';

const DonationForm = ({ show, handleClose, campaignId, campaignName, smartContractAddress, amountCollected, requiredFunding }) => {
    const { ethereum } = window;
    const [donationAmount, setDonationAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });
    const [user, setUser] = useState({});
    const [showNotificationModal, setNotificationModal] = useState(false);

    const handleShowNotificationModal = () => {
        setNotificationModal(true);
    };

    const handleCloseNotificationModal = () => {
        setNotificationModal(false);
        window.location.reload(true);
    };

    useEffect(() => {
        const cookie = Cookies.get('jwt');
        const user = jsonwebtoken.decode(cookie);
        setUser(user);
    }, [])

    const isDonationDataValid = () => {
        if (donationAmount * Math.pow(10, 18) + amountCollected > requiredFunding) {
            setIsError({ value: true, msg: 'Donation Amount is greater than required funding' });
            return false;
        }
        else if (donationAmount === '' || donationAmount === 0) {
            setIsError({ value: true, msg: 'Please Fill in All the Fields' });
            return false;
        }
        setIsError({ value: false, msg: "" });
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDonationDataValid()) {
            setIsLoading(true);
            //const walletProvider = provider();
            var web3 = new Web3(ethereum); // walletProvider in case you use Ganache
            var account = ethereum.account //await web3.eth.getAccounts(); in case you are using Ganache
            web3.eth.transactionBlockTimeout = 200;
            web3.eth.transactionPollingTimeout = 10000;

            web3.eth.sendTransaction(
                { to: smartContractAddress, value: donationAmount * Math.pow(10, 18), from: account }).on('error', (error) => {
                    setIsError({ value: true, msg: 'Cannot Donate to the Campaign. Try Again Later' });
                    console.log(error);
                    setIsLoading(false);
                }).on('transactionHash', (transactionHash) => {
                    console.log('Transaction Hash: ', transactionHash);
                }).on('receipt', async (receipt) => {
                    console.log('Txn. Receipt: ', receipt);
                    const formData = new FormData();
                    formData.append('userId', user.id);
                    formData.append('amount', donationAmount);
                    for (var value of formData.values()) {
                        console.log(value);
                    }
                    const requestOptions = {
                        method: 'POST',
                        body: formData,
                        withCredentials: true,
                        credentials: "include"
                    };
                    const response = await fetch(`http://localhost:4545/api/campaign/${campaignId}/donate`, requestOptions);
                    if (response.status !== 200) {
                        setIsError({ value: true, msg: 'Error: Cannot Donate to the Campaign... Try Again Later' });
                        setIsLoading(false);
                    } else {
                        handleClose();
                        handleShowNotificationModal();
                    }
                });
        }
    }

    return <>
        <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-center" centered>
            <Modal.Header>
                <Modal.Title className="font-weight-bold">
                    Donation Form
                </Modal.Title>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&#10006;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <h3 className='text-center font-weight-bold'>{campaignName}</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="donation-amount" className="font-weight-bold">Donation Amount <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control" id="donation-amount" name='donationAmount' placeholder="Enter Donation Amount (ETH)" min={1} value={donationAmount === 0 ? null : donationAmount} onChange={(e) => setDonationAmount(e.target.value)} required />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {isLoading && <h6>Processing Transaction...</h6>}
                {isError.value && <h6> {isError.msg}</h6>}
                <Button variant="primary" className="btn btn-custom font-weight-bold" onClick={handleSubmit}>
                    Donate
                </Button>
            </Modal.Footer>
        </Modal>
        <NotificationModal show={showNotificationModal} handleClose={handleCloseNotificationModal} notificationMessage={donationAmount + " ETH has been Donated Successfully to the " + campaignName + ". Thank you for your contribution."} notificationHeader={"Donation Successful"} />
    </>
}

export default DonationForm