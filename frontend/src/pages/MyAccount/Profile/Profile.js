import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userData }) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState('true');
  const [isError, setIsError] = useState({ value: false, msg: '' });

  const [user, setUser] = useState({
    userName: userData.userName,
    emailId: userData.emailId,
    password: userData.password,
    fullName: userData.fullName,
    dob: userData.dob.split('T')[0],
    currentCity: userData.currentCity,
    state: userData.state
  });

  const onCancel = () => {
    setUser({
      userName: userData.userName,
      emailId: userData.emailId,
      password: userData.password,
      fullName: userData.fullName,
      dob: userData.dob.split('T')[0],
      currentCity: userData.currentCity,
      state: userData.state
    })
    setDisabled(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('password', user.password);
    formData.append('fullName', user.fullName);
    formData.append('dob', user.dob);
    formData.append('emailId', user.emailId);
    formData.append('currentCity', user.currentCity);
    formData.append('state', user.state);

    const requestOptions = {
      method: 'PUT',
      body: formData
    };
    const response = await fetch(`http://localhost:4545/api/user/${userData._id}`, requestOptions);
    const result = await response.json();
    if (response.status !== 200) {
      setIsError({ value: true, msg: result.msg });
    }
    else {
      setIsError({ value: false, msg: result.msg });
      // navigate('/');
    }
    console.log("Result=", result);
    console.log(user)
    setDisabled(false);
  }

  function editFields() {
    setDisabled(false);
  }

  // if (loading) {
  //   return <>
  //     <h1>Loading....</h1>
  //   </>;
  // }
  return <>

    <form>
      <div className="form-group col-md-6">
        <label >User Name</label>
        <input type="text" name='userName' onChange={handleChange} className="form-control" value={user.userName} placeholder="UserName" disabled={disabled} />
      </div>
      <div className="form-group col-md-6">
        <label >Email Address</label>
        <input type="email" name='emailId' className="form-control" value={user.emailId} placeholder="Email" disabled={true} />
      </div>
      <div className="row m-0">
        <div className="form-group col-sm-5">
          <label>Full Name</label>
          <input type="text" value={user.fullName} name='fullName' onChange={handleChange} className="form-control" disabled={disabled} />
        </div>
        <div className="form-group col-md-4">
          <label >Date Of Birth</label>
          <input type={disabled ? "text" : "date"} name='dob' onChange={handleChange} value={user.dob} className="form-control" disabled={disabled} />
        </div>
      </div>
      <div className="row m-0">
        <div className="form-group col-md-5">
          <label >City</label>
          <input type="text" className="form-control" name='currentCity' onChange={handleChange} value={user.currentCity} disabled={disabled} />
        </div>
        <div className="form-group col-sm-5">
          <label >State</label>
          <input type="text" className="form-control" name='state' onChange={handleChange} value={user.state} disabled={disabled} />
        </div>
      </div>
      {isError.value && <h6 className='text-danger text-center'>{isError.msg}</h6>}
      <div className="row ml-0 mr-0">
        <div className="col-sm-2">
          <button type="button" onClick={disabled == false ? handleSubmit : editFields} className="btn btn-primary">{disabled == false ? "Save" : "Edit"}</button>
        </div>
        <div className="col-sm-2">
          {disabled ? null : <button type="button" onClick={onCancel} className="btn btn-primary">Cancel</button>}
        </div>
      </div>
    </form>
  </>
};

export default Profile;
