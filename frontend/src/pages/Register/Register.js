import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';

const Register = () => {
    window.scrollTo(0, 0);
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
        <div className='container col-md-4 mb-5'>
            <h1 className='text-center font-weight-bold mt-3 mb-3'>Create a New Account</h1>
            <form >
                <div className="form-group">
                    <label htmlFor="userName" className="custom-font" >Username <span className='text-danger'>*</span></label>
                    <input type="text" name='userName' value={user.userName} onChange={handleChange} className="form-control" placeholder="User Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="emailId" className="custom-font" >EmailId <span className='text-danger'>*</span></label>
                    <input type="email" name='emailId' value={user.emailId} onChange={handleChange} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="custom-font" >Password <span className='text-danger'>*</span></label>
                    <input type="password" name='password' value={user.password} onChange={handleChange} className="form-control" placeholder=" Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName" className="custom-font" >Full Name <span className='text-danger'>*</span></label>
                    <input type="text" name='fullName' value={user.fullName} onChange={handleChange} className="form-control" placeholder="Full Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="dob" className="custom-font" >Date of Birth <span className='text-danger'>*</span></label>
                    <input type="date" name='dob' value={user.dob} onChange={handleChange} className="form-control" placeholder="Select a Date" />
                </div>
                <div className="form-group">
                    <label htmlFor="currentCity" className="custom-font" >City <span className='text-danger'>*</span></label>
                    <input type="text" name='currentCity' value={user.currentCity} onChange={handleChange} className="form-control" placeholder="Current City" />
                </div>
                <div className="form-group">
                    <label htmlFor="state" className="custom-font" >State <span className='text-danger'>*</span></label>
                    <input type="text" name='state' value={user.state} onChange={handleChange} className="form-control" placeholder="State" />
                </div>
                {isError.value && <h6 className='text-danger text-center'>{isError.msg}</h6>}
                <div className="text-center">
                    <button type="submit" onClick={handleSubmit} className="btn btn-custom font-weight-bold">Sign Up</button>
                </div>
            </form>
            <h6 className="text-center mt-3 mb-5">
                Already have an account ?<a href="/login" className="alert-link"> Log In</a>
            </h6>
        </div>
    </>;
};

export default Register;
