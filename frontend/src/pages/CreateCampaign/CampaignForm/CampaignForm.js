import React, { useState } from 'react';
import { ObjectID } from 'bson';
import { useNavigate } from 'react-router-dom';
import { provider, deployContract } from '../../../ETHBackend/deploy-contract';
import { isMetamaskInstalled } from '../../../components/ETHConnect/ETHConnect';

//AntD Components
import { Spin } from 'antd';

//CSS
import './CampaignForm.css';

const compiledContract = require('../../../ETHBackend/build/campaignContract.json');
const Web3 = require('web3');

const CampaignForm = ({ campaignOrganiser }) => {
    const navigate = useNavigate();
    const { ethereum } = window;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });
    const [campaign, setCampaign] = useState({
        campaignName: '',
        campaignDescription: '',
        campaignCategory: 'Education',
        requiredFunding: 0,
        campaignCoverMedia: [],
        campaignResources: []
    })

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
            setCampaign({ ...campaign, [name]: Array.from(e.target.files) });
        }
        else {
            setCampaign({ ...campaign, [name]: value });
        }
    }

    const isCampaignDataValid = () => {
        if (campaign.campaignName === '' || campaign.campaignDescription === '' || campaign.requiredFunding === 0 || campaign.requiredFunding === '') {
            setIsError({ value: true, msg: 'Please Fill All the Required Fields' });
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(campaign);
        if (isCampaignDataValid()) {
            setIsLoading(true);
            if (isMetamaskInstalled()) {
                //const walletProvider = provider();
                var web3 = new Web3(window.ethereum);
                // web3.eth.Contract.transcationBlockTimeout = 200;
                // web3.eth.Contract.transactionPollingTimeout = 10000;
                console.log('\nStarting Deployment of Contract from account: ', ethereum.account);
                var contractABI = compiledContract.campaignContract.abi;
                var contractObject = new web3.eth.Contract(contractABI).deploy(
                    {
                        data: '0x' + compiledContract.campaignContract.evm.bytecode.object,
                        arguments: ['0x7a7cC4CE2f66AdDbF1A52D8536565F3deE535327']
                    }
                );
                contractObject.transactionPollingTimeout = 10000;
                contractObject.transactionBlockTimeout = 200;

                await contractObject.send({ from: ethereum.account }).on('error', (error) => {
                    if (error.code === 4001) setIsError({ value: true, msg: 'User Denied Contract Creation. Please Approve the Transaction to create Contract' });
                    else setIsError({ value: true, msg: 'Cannot Create Smart Contract... Please Try Again' });
                    setIsLoading(false);
                    console.log(error);
                }).on('transactionHash', (transactionHash) => {
                    console.log('Transaction Hash: ', transactionHash);
                }).on('receipt', async (receipt) => {
                    console.log('Txn. Receipt: ', receipt);
                    const campaignId = new ObjectID();
                    const formData = new FormData();

                    formData.append('campaignId', campaignId);
                    if (campaign.campaignCoverMedia.length === 1) formData.append('campaignCoverMedia', campaign.campaignCoverMedia[0]);
                    for (var i = 0; i < campaign.campaignResources.length; i++)
                        formData.append('campaignResources', campaign.campaignResources[i]);
                    formData.append('campaignOrganiser', campaignOrganiser);
                    formData.append('campaignName', campaign.campaignName);
                    formData.append('campaignDescription', campaign.campaignDescription);
                    formData.append('campaignCategory', campaign.campaignCategory);
                    formData.append('requiredFunding', campaign.requiredFunding);
                    formData.append('smartContractAddress', receipt.contractAddress);

                    const requestOptions = {
                        method: 'POST',
                        body: formData
                    };

                    const response = await fetch('http://localhost:4545/api/campaign', requestOptions);
                    const result = await response.json();
                    if (response.status !== 200) {
                        setCampaign({
                            campaignName: '',
                            campaignDescription: '',
                            campaignCategory: 'Education',
                            requiredFunding: 0,
                            campaignCoverMedia: [],
                            campaignResources: []
                        })
                        setIsLoading(false);
                    } else {
                        navigate(`/campaign/${result._id}`);
                    }
                });
            }
            else {
                setIsError({ value: true, msg: 'Seems Like your Metamask is not Installed... Please install Metamask first' });
            }
        }
    }


    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size='large' />
            </div>
        )
    }
    return <>
        <h1 className='text-center mt-3 font-weight-bold'>Create Campaign</h1>
        <div className='container form-box mb-5' >
            <form style={{ 'padding': '30px' }}>
                <div className="form-group">
                    <label htmlFor="campaign-name" style={{ "font-size": "17px", "font-weight": "bold" }}>Campaign Name <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control form-textbox" id="campaign-name" name='campaignName' placeholder="Type in Campaign Name" value={campaign.campaignName} onChange={handleChange} required autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-description" style={{ "font-size": "17px", "font-weight": "bold" }}>Campaign Description <span className='text-danger'>*</span></label>
                    <textarea className="form-control form-textbox" id="campaign-description" rows="10" name='campaignDescription' placeholder="Type in Campaign Description" value={campaign.campaignDescription} onChange={handleChange} required />
                </div>
                <div className='row'>
                    <div className="form-group col-sm-3 col-md-8">
                        <label htmlFor="total-funding" style={{ "font-size": "17px", "font-weight": "bold" }}>Total Funding Needed <span className='text-danger'>*</span></label>
                        <input type="number" className="form-control form-textbox" id="campaign-name" name='requiredFunding' placeholder="Enter Total Funding Needed" min={1} value={campaign.requiredFunding === 0 ? null : campaign.requiredFunding} onChange={handleChange} required />
                    </div>
                    <div className="form-group col-sm-5 col-md-4">
                        <label htmlFor="campaign-category" style={{ "font-size": "17px", "font-weight": "bold" }}>Campaign Category <span className='text-danger'>*</span></label>

                        {/* <div class="select" tabindex="1" id="campaign-category" name='campaignCategory' onChange={handleChange} required>
                            <input class="selectopt" name="test" type="radio" id="opt1" />
                            <label for="opt1" class="option">Education</label>
                            <input class="selectopt" name="test" type="radio" id="opt2" />
                            <label for="opt2" class="option">Medical</label>
                            <input class="selectopt" name="test" type="radio" id="opt3" />
                            <label for="opt3" class="option">Human Rights</label>
                            <input class="selectopt" name="test" type="radio" id="opt4" />
                            <label for="opt4" class="option">Disaster Relief</label>
                            <input class="selectopt" name="test" type="radio" id="opt5" />
                            <label for="opt5" class="option">Animal Care</label>
                            <input class="selectopt" name="test" type="radio" id="opt6" />
                            <label for="opt6" class="option">Environment</label>
                        </div> */}
                        <select className="form-control" id="campaign-category" name='campaignCategory' value={campaign.campaignCategory} onChange={handleChange} required>
                            <option>Education</option>
                            <option>Medical</option>
                            <option>Human Rights</option>
                            <option>Disaster Relief</option>
                            <option>Animal Care</option>
                            <option>Environment</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="campaign-cover-image" style={{ "font-size": "17px", "font-weight": "bold" }}>Campaign Cover Image</label><br />
                    <label className='file-btn' htmlFor="campaign-cover-image" style={{ "font-size": "17px" }}>Choose File</label>
                    <label htmlFor="campaign-cover-image">&nbsp;&nbsp;{campaign.campaignCoverMedia.length === 0 ? null : campaign.campaignCoverMedia[0].name}</label> <br />
                    <input type="file" id="campaign-cover-image" name="campaignCoverMedia" onChange={handleChange} accept='image/*' style={{ "display": "none" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-resources" style={{ "font-size": "17px", "font-weight": "bold" }}>Campaign Resources</label> <br />
                    <label className='file-btn' htmlFor="campaign-resources" style={{ "font-size": "17px" }}>Choose Files</label>
                    <label htmlFor="campaign-resources">&nbsp;&nbsp;{campaign.campaignResources.length === 0 ? null : campaign.campaignResources.length + " Files selected"}</label> <br />
                    <input type="file" id="campaign-resources" name="campaignResources" multiple onChange={handleChange} data-max-size='1024' style={{ "display": "none" }} />
                    {isError.value && <h6 className='text-danger'>{isError.msg}</h6>}
                </div>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-custom font-weight-bold"
                        onClick={handleSubmit}
                    >
                        Create Campaign
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default CampaignForm;