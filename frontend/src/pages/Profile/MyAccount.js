import React from 'react';
import { useState } from 'react';
import MyCampaigns from './MyCampaigns';
import Profile from './Profile';
import SettingsList from './SettingsList';

//CSS
import './Profile.css';


//Controllers
import { useFetch } from '../../controllers/useFetch';
import Navigationbar from '../../components/Navigationbar/Navigationbar';


const MyAccount = () => {

    
    // const cookie = Cookies.get('jwt');
    // const userId = jsonwebtoken.decode(cookie).id;
    const { loading, data: userData } = useFetch(`http://localhost:4545/api/user/621372eb619bbf3301977270`)

    const [settingsList, setSettingsList] = useState(['Profile', 'My Campaigns', 'My Donations', 'Notifications']);
    const [selectedTab, setSelectedTab] = useState('Profile');

    const changeTab = (tabName) => {
      setSelectedTab(tabName);
    }

    if (loading) {
      return <>
        <h1>Loading....</h1>
      </>;
    }
    
    return <>
    {console.log(userData.createdCampaigns)}
      <Navigationbar />
      <div className="container-fluid">
      <div className="row">
        <div className="left-panel border-right border-primary col-md-2">
        <SettingsList itemsList={settingsList} currentActive={selectedTab} clickFunction={changeTab} />
        </div>
        
        <div className='right-panel col-md-6'>
        {selectedTab === 'Profile' && <Profile userData={userData}/>}
        {selectedTab === 'My Campaigns' && <MyCampaigns createdCampaigns={userData.createdCampaigns}/>}
        {selectedTab === 'My Donations' && <Profile />}
        {selectedTab === 'Notifications' && <MyCampaigns/>}
        </div>
        </div>
      </div>
      
  </>
};

export default MyAccount;
