import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {web3Provider} from '../../ETHBackend/deploy-contract';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';

const Register = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState({ value: false, msg: '' });
  const [user, setUser] = useState({
    userName: '',
    emailId: '',
    password: '',
    fullName: '',
    dob: '',
    currentCity: '',
    state: ''
  });

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
      method: 'POST',
      body: formData
    };
    const response = await fetch('http://localhost:4545/api/user', requestOptions);
    const result = await response.json();
    if (response.status !== 200) {
      setIsError({ value: true, msg: result.msg });
    } else {
      navigate('/login');
    }
  }
  return <>
    <Navigationbar />
    <div className='container col-md-4'>
      <h1 className='text-primary text-center'>Create a New Account</h1>
      <form>
        <div className="form-group">
          <input type="text" name='userName' value={user.userName} onChange={handleChange} className="form-control" placeholder="User Name" />
        </div>
        <div className="form-group">
          <input type="email" name='emailId' value={user.emailId} onChange={handleChange} className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" name='password' value={user.password} onChange={handleChange} className="form-control" placeholder=" Password" />
        </div>
        <div className="form-group">
          <input type="text" name='fullName' value={user.fullName} onChange={handleChange} className="form-control" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <input type="date" name='dob' value={user.dob} onChange={handleChange} className="form-control" placeholder="Select a Date" />
        </div>
        <div className="form-group">
          <input type="text" name='currentCity' value={user.currentCity} onChange={handleChange} className="form-control" placeholder="Current City" />
        </div>
        <div className="form-group">
          <input type="text" name='state' value={user.state} onChange={handleChange} className="form-control" placeholder="State" />
        </div>
        {isError.value && <h6 className='text-danger text-center'>{isError.msg}</h6>}
        <div className="text-center">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      <h6 className="text-center">
        Already have an account ?<a href="/login" className="alert-link"> Log In</a>
      </h6>
    </div>
  </>;
};

export default Register;
