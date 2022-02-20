import React from 'react';
import { useState } from 'react';

//CSS
import './Profile.css';

//Controllers
import { useFetch } from '../../controllers/useFetch';

const Profile = () => {

  const [disabled, setDisabled] = useState('true');
  const { loading, data: userData } = useFetch(`http://localhost:4545/api/user/61cea52b523aa14de4cb5597`)

  if (loading) {
    return <>
      <h1>Loading....</h1>
    </>;
  }

  function editFields() {
    setDisabled(false);
  }
  return <>
    {/* <h1>{userData.userName}</h1> */}
    <div className="row">
      <div className="left-panel border-right border-primary col-md-2">
        <nav className="nav flex-column">
          <a className="nav-link active disabled" >Profile Settings </a>
          <a className="nav-link" href="#">My Campaigns</a>
          <a className="nav-link" href="#">My Donations</a>
          <a className="nav-link ">Notifications</a>
        </nav>
      </div>
      <div className='right-panel col-md-6'>
        {/* <h1 className='text-primary '>Profile</h1> */}
        <form>
          <div className="form-group col-md-4">
            <label >User Name</label>
            <input type="text" name='userName' className="form-control" value={userData.userName} placeholder="UserName" disabled={disabled} />
          </div>
          <div className="form-group col-md-4">
            <label >Email Address</label>
            <input type="email" name='emailId' className="form-control" value={userData.emailId} placeholder="Email" disabled={true} />
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label >Date Of Birth</label>
              <input type={disabled? "text": "date"} value={userData.dob.substring(0, 10)} className="form-control" disabled={disabled} />
            </div>
            <div className="form-group col-md-6">
              <label>Full Name</label>
              <input type="text" value={userData.fullName} className="form-control" disabled={disabled} />
            </div>
          </div>
          <div className="form-group col-md-4">
            <label >City</label>
            <input type="text" className="form-control" value={userData.currentCity} disabled={disabled} />
          </div>
          <div className="form-group col-md-4">
            <label >State</label>
            <input type="text" className="form-control" value={userData.state} disabled={disabled} />
          </div>

          <div className="row">
            <div className="col-md-1">
            <button type="button" onClick={editFields} className="btn btn-primary">{disabled == false ? "Save" : "Edit"}</button>
            </div>
            <div className="col-md-1">
            {disabled? null:<button type="button" className="btn btn-primary">Cancel</button>}
            </div>
            
          </div>
        </form>
      </div>
    </div>

  </>;
};

export default Profile;
