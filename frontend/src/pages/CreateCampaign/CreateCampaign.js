import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

// Components
import CampaignForm from "./CampaignForm/CampaignForm";
import Navigationbar from '../../components/Navigationbar/Navigationbar';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const cookie = Cookies.get('jwt');
        if (cookie === undefined) navigate('/login');
    }, []);

    return <>
        <Navigationbar />
        <CampaignForm />
    </>;
};

export default CreateCampaign;
