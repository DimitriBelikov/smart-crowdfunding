import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { provider } from '../../../../ETHBackend/deploy-contract';
import Web3 from 'web3';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

const DonationForm = ({ show, handleClose, campaignId, campaignName, smartContractAddress }) => {
    const [donationAmount, setDonationAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });
    const [user, setUser] = useState({});

    useEffect(() => {
        const cookie = Cookies.get('jwt');
        const user = jsonwebtoken.decode(cookie);
        setUser(user);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const walletProvider = provider();
        var web3 = new Web3(walletProvider);
        var account = await web3.eth.getAccounts();

        web3.eth.sendTransaction({ to: smartContractAddress, value: donationAmount * Math.pow(10, 18), from: account[0] }).then(async (res) => {
            console.log(res);

            const formData = new FormData();
            formData.append('userId', user.id);
            formData.append('amount', donationAmount);
            for (var value of formData.values()) {
                console.log(value);
            }

            const requestOptions = {
                method: 'POST',
                body: formData
            };
            const response = await fetch(`http://localhost:4545/api/campaign/${campaignId}/donate`, requestOptions);
            const result = await response.json();
            if (response.status !== 200) {
                setIsError({ value: true, msg: 'Error: Cannot Donate to the Campaign... Try Again Later' });
                alert('Error: while Donating Amount.');
                setIsLoading(false);
            } else {
                alert('Amount Donated Successfully');
                window.location.reload(true);
            }
        }).catch(error => {
            setIsError({ value: true, msg: 'Error: Cannot Donate to the Campaign... Try Again Later' });
            alert('Error while Donating Amount.');
            setIsLoading(true);
        });

    }

    return <>
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-center" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Donation Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className='text-center'>{campaignName}</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="donation-amount">Donation Amount <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control" id="donation-amount" name='donationAmount' placeholder="Enter Donation Amount (ETH)" min={1} value={donationAmount === 0 ? null : donationAmount} onChange={(e) => setDonationAmount(e.target.value)} required />
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

export default DonationForm