import React from 'react';
import LoginPageModel from './login.model';
import { ModelConnector } from '../../Stores/index';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';


const LoginPage = observer(({ model }: any) => {
  const navigate = useNavigate();
  return (
    < div className="login-page">
      <div className="stage">
        <div onDoubleClick={model.openSuperAdmin} className="title">
          <span className="fancy">Easy</span> Purchase App
        </div>
        <div className="stage-body">
          <div>Login</div>
          <input
            type='email'
            className='login-input'
            placeholder='Email'
            onChange={(e) => model.setUserEmail(e.target.value)}
          />
          <div>
            <input
              type='password'
              className='login-input'
              placeholder='Password'
              onChange={(e) => model.setPassword(e.target.value)}
            />
            {/* <span><button className="link">Forgot Password</button></span> */}
          </div>
          <button className="stage-button" onClick={() => model.attemptLogin(navigate)}>Login</button>
        </div>
      </div>
    </div>
  );
});

export default ModelConnector(LoginPage, { model: LoginPageModel });
