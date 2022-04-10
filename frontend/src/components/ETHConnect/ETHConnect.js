import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ETHConnect({show, handleClose}) {
    const {ethereum} = window;
    const [connectMetamask, setConnectMetamask] = useState({value: 'Click to install Metamask', status: 'disconnected'});
    const [isError, setIsError] = useState({value: false, msg: ''});
    const navigate = useNavigate();

    useEffect(() => {
        if(isMetamaskInstalled()) setConnectMetamask({value: 'Click to Connect', status: 'disconnected'})
    }, []);
    
    const connectToMetamask = async ()=> {
        if(!isMetamaskInstalled()) window.open("https://metamask.io/download/", "_blank")
        else {
            await ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
                setConnectMetamask({value: 'Wallet Connected Successfully', status: 'connected'});
                setIsError({
                    value: false,
                    msg: ''
                })
                console.log(result);
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Connect Metamask
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    It seems like your Metmask wallet is not connected to the Application or you 
                    don't have a Metamask wallet. Please Click below to Install the Metamask Wallet.
                </p>
                <div className='text-center'>
                    <Button onClick={connectToMetamask} className={connectMetamask.value == 'Wallet Connected Successfully'? 'btn-success': null} >{connectMetamask.value}</Button>
                </div>
                {isError.value && <p className='text-danger text-center'>{isError.msg}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} disabled={connectMetamask.status==='disconnected'? true:null}>Close</Button>
                <Button onClick={()=> navigate('/')} >HomePage</Button>
            </Modal.Footer>
        </Modal>
    </>
}

const isMetamaskInstalled = () => {
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

const isAccountConnected = async() => {
    const {ethereum} = window;
    await ethereum.request({ method: 'eth_accounts' }).then(result => {
        if (result.length == 0) return false;
    }).catch(error => {
        return false;
    });
}

export {ETHConnect, isMetamaskInstalled, isAccountConnected};