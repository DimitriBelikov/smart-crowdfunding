import React from 'react';

const Login = () => {
  return <>
        <div className='container col-md-3'>
            <form>
              
              <div className="form-group">
                <input type="text" className="form-control" placeholder="User Name"/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password"/>
              </div>
              <div className="text-center">
              <button type="button" onClick="#" className="btn btn-primary">Login</button>
              </div>   
            </form>
            

        </div>
  </>;
};

export default Login;
