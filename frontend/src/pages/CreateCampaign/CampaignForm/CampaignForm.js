import React, { useState } from 'react';
import { ObjectID } from 'bson';
import { useNavigate } from 'react-router-dom';
import { provider, deployContract } from '../../../ETHBackend/deploy-contract';
import {isMetamaskInstalled} from '../../../components/ETHConnect/ETHConnect';

const CampaignForm = ({ campaignOrganiser }) => {
    const navigate = useNavigate();
    const {ethereum} = window;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: ''});
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
                setIsError({ value: true, msg: 'You can upload maximum 10 files'});
                return;
            } else {
                for (var i = 0; i < filesArray.length; i++) {
                    if (filesArray[i].size > 10500000) {
                        setIsError({ value: true, msg: 'One of your files have exceded the limit of 10MB'});
                        return;
                    }
                }

            }
            setIsError({ value: false, msg: ''});
            setCampaign({ ...campaign, [name]: Array.from(e.target.files) });
        }
        else {
            setCampaign({ ...campaign, [name]: value });
        }
    }

    const isCampaignDataValid = () => {
        if (campaign.campaignName === '' || campaign.campaignDescription === '' || campaign.requiredFunding === 0 || campaign.requiredFunding === ''){
            setIsError({ value: true, msg: 'Please Fill All the Required Fields'});
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isCampaignDataValid()) {
            setIsLoading(true);
            if (isMetamaskInstalled()){
                //const walletProvider = provider();
                deployContract(ethereum.account).then(async (smartContractAddress) => {
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
                    formData.append('smartContractAddress', smartContractAddress);

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
                }).catch(error => {
                    if (error.code === 4001){
                        setIsError({ value: true, msg: 'User Denied Contract Creation. Please Approve the Transaction to create Contract'});
                    } else {
                        setIsError({ value: true, msg: 'Cannot Create Smart Contract... Please Try Again'});
                    }
                    
                    // alert('Error: ' + error);
                    setIsLoading(false);
                    console.log(error);
                    // window.location.reload(true);
                })
            }
            else{
                setIsError({ value: true, msg: 'Seems Like your Metamask is not Installed... Please install Metamask first'});
            }
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return <>
        <h1 className='text-center'>Create a Campaign</h1>
        <div className='container'>
            <form>
                <div className="form-group">
                    <label htmlFor="campaign-name">Campaign Name <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" id="campaign-name" name='campaignName' placeholder="Type in Campaign Name" value={campaign.campaignName} onChange={handleChange} required autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-description">Campaign Description <span className='text-danger'>*</span></label>
                    <textarea className="form-control" id="campaign-description" rows="5" name='campaignDescription' placeholder="Type in Campaign Description" value={campaign.campaignDescription} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-category">Campaign Category <span className='text-danger'>*</span></label>
                    <select className="form-control" id="campaign-category" name='campaignCategory' value={campaign.campaignCategory} onChange={handleChange} required>
                        <option>Education</option>
                        <option>Medical</option>
                        <option>Human Rights</option>
                        <option>Disaster Relief</option>
                        <option>Animal Care</option>
                        <option>Environment</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="total-funding">Total Funding Needed <span className='text-danger'>*</span></label>
                    <input type="number" className="form-control" id="campaign-name" name='requiredFunding' placeholder="Enter Total Funding Needed" min={1} value={campaign.requiredFunding === 0 ? null : campaign.requiredFunding} onChange={handleChange} required />
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
                <div className="text-center">
                        <button className="btn btn-primary align-center" type="submit" onClick={handleSubmit} >Create Campaign</button>:
                </div>
            </form>
        </div>
    </>
}

export default CampaignForm;