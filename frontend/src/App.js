import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Campaigns from './pages/Campaigns/Campaigns';
import Campaign from './pages/Campaign/Campaign';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import CreateCampaign from './pages/CreateCampaign/CreateCampaign';

//Components
import Navigationbar from './components/Navigationbar/Navigationbar';
import Footer from './components/Footer/Footer';

//CSS
import './App.css';
import MyAccount from './pages/Profile/MyAccount';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaign/:id" element={<Campaign />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<MyAccount />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
