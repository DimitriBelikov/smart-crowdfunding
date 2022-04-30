import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ETHConnect({ show, handleClose }) {
    const { ethereum } = window;
    const [connectMetamask, setConnectMetamask] = useState({ value: 'Click to install Metamask', status: 'disconnected' });
    const [isError, setIsError] = useState({ value: false, msg: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (isMetamaskInstalled()) setConnectMetamask({ value: 'Click to Connect', status: 'disconnected' })
    }, []);

    const connectToMetamask = async () => {
        if (!isMetamaskInstalled()) window.open("https://metamask.io/download/", "_blank")
        else {
            await ethereum.request({ method: 'eth_requestAccounts' }).then(async (result) => {
                setConnectMetamask({ value: 'Wallet Connected Successfully', status: 'connected' });
                setIsError({ value: false, msg: '' });
                ethereum.account = result[0];
                await ethereum.request({ method: 'eth_chainId' }).then(chainId => {
                    ethereum.chainId = chainId;
                    console.log('ChainId = ', ethereum.chainId);
                }).catch(error => {
                    setIsError({
                        value: true,
                        msg: error.message + '. Error with Chain... Please Try Again'
                    })
                    console.log(error);
                })
                console.log('Current Account = ', ethereum.account);
            }).catch(error => {
                setIsError({
                    value: true,
                    msg: error.message + '. To connect to Metamask click Connect on your Metamask Extension'
                })
                console.log(error);
            });
        }
    }

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
                    Connect Metamask
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>
                    It seems like your Metmask wallet is not connected to the Application or you
                    don't have a Metamask wallet. Please Click below to Install the Metamask Wallet.
                </h6>
                <div className='text-center mt-4'>
                    <Button onClick={connectToMetamask} className={`btn font-weight-bold ${connectMetamask.value == 'Wallet Connected Successfully' ? 'btn-success' : "btn-custom"}`} >{connectMetamask.value}</Button>
                </div>
                {isError.value && <p className='text-danger text-center'>{isError.msg}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-custom font-weight-bold" onClick={handleClose} disabled={connectMetamask.status === 'disconnected' ? true : null}>Close</Button>
                <Button className="btn btn-custom font-weight-bold" onClick={() => navigate('/')} >HomePage</Button>
            </Modal.Footer>
        </Modal>
    </>
}

const isMetamaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

// const isAccountConnected = () => {
//     const {ethereum} = window;
//     ethereum.request({ method: 'eth_accounts' }).then(result => {
//         if (result.length == 0) return false;
//         return true
//     }).catch(error => {
//         return false;
//     });
// }

export { ETHConnect, isMetamaskInstalled };