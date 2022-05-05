import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsonwebtoken from 'jsonwebtoken';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';

const Login = () => {
    window.scrollTo(0, 0);
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
        if (response.status !== 200) {
            setIsError({ value: true, msg: result.msg });
        } else {
            const cookie = document.cookie.match("(^|;)\\s*" + 'jwt' + "\\s*=\\s*([^;]+)");;
            console.log('cookie = ', cookie);
            const data = jsonwebtoken.decode(cookie);
            console.log(data);
            navigate('/');
        }

    }

    return <>
        <Navigationbar />
        <div className='container col-md-4'>
            <h1 className='mt-3 text-center font-weight-bold'>Log In</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="campaign-name" style={{ "font-size": "17px", "font-weight": "bold" }}>Email <span className='text-danger'>*</span></label>
                    <input type="email" name='emailId' value={user.emailId} onChange={handleChange} className="form-control form-textbox" placeholder="Enter your Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="campaign-name" style={{ "font-size": "17px", "font-weight": "bold" }}>Password <span className='text-danger'>*</span></label>
                    <input type="password" name='password' value={user.password} onChange={handleChange} className="form-control form-textbox" placeholder="Enter Password" />
                </div>
                {isError.value && <h6 className='text-center text-danger'>{isError.msg}</h6>}
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-custom font-weight-bold"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
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
