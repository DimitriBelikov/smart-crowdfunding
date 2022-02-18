import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState({ value: false, msg: '' });
  const [user, setUser] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('emailId', user.emailId);
    formData.append('password', user.password);

    const requestOptions = {
      method: 'POST',
      body: formData,
      withCredentials: true,
      credentials: 'include'
    };

    const response = await fetch('http://localhost:4545/api/user/login', requestOptions);
    const result = await response.json();
    console.log(result);
    if (response.status !== 200) {
      setIsError({ value: true, msg: result.msg });
    } else {
      navigate('/campaigns');
    }

  }

  return <>
    <div className='container col-md-4'>
      <h1 className='text-primary text-center'>Log In</h1>
      <form>
        <div className="form-group">
          <input type="email" name='emailId' value={user.emailId} onChange={handleChange} className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" name='password' value={user.password} onChange={handleChange} className="form-control" placeholder="Password" />
        </div>
        {isError.value && <h6 className='text-center text-danger'>{isError.msg}</h6>}
        <div className="text-center">
          <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
        </div>
      </form>
      <br />
      <h6 className="text-center">
        Don't have an account ?<a href="/register" className="alert-link"> Create a new Account</a>
      </h6>

    </div>
  </>;
};

export default Login;
